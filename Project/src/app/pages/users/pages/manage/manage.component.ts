import {Component, OnInit} from '@angular/core';
import {ManageUserModel} from '@api/users/req/manage-user.model';
import {NzUploadFile} from 'ng-zorro-antd';
import {ManageTypesEnum} from '@enums/manage-types.enum';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {getOneUserAction} from '@pages/users/store/actions/users-get-one.actions';
import {
  isCreatingUserSelector,
  isEditingUserSelector,
  userSelector
} from '@pages/users/store/selectors/users.selectors';
import {IUserModel} from '@api/users/res/user.interface';
import {createUserAction, createUserSuccessAction} from '@pages/users/store/actions/users-create.actions';
import {editUserAction, editUserSuccessAction} from '@pages/users/store/actions/users-edit.actions';
import {UsersHelperService} from '@pages/users/services/users-helper.service';
import {FilesService} from '@api/files/files.service';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  ManageTypesEnum = ManageTypesEnum;
  id = '';
  form: ManageUserModel = new ManageUserModel();
  fileList: NzUploadFile[] | any = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  uploadImageType: ManageTypesEnum = ManageTypesEnum.Add;
  isManagingUser$: Observable<boolean>;

  constructor(
    public router: Router,
    private store: Store,
    public helperService: UsersHelperService,
    private activatedRoute: ActivatedRoute,
    private filesService: FilesService,
    private actionsSubject: Actions,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.id = params.id;
        this.uploadImageType = ManageTypesEnum.Edit;
        this.store.dispatch(getOneUserAction({id: this.id}));
        this.store.pipe(select(userSelector, this.id)).subscribe((user: IUserModel) => {
          if (user) {
            this.form.formGroup.patchValue(user);
            this.fileList = user.files?.map(file => {
              return {
                uid: file.id,
                id: file.id,
                url: `${environment.apiUrl}${file.url}`
              };
            });
            this.isManagingUser$ = this.store.pipe(select(isEditingUserSelector));
            if (this.router.url.includes(ManageTypesEnum.Preview)) {
              this.uploadImageType = ManageTypesEnum.Preview;
              this.form.disableAllControls();
            }
          }
        });
      } else {
        this.isManagingUser$ = this.store.pipe(select(isCreatingUserSelector));
      }
    });
    this.initializeValues();
  }

  initializeValues() {
    this.actionsSubject.pipe(ofType(createUserSuccessAction)).subscribe(data => this.router.navigate(['', 'users', 'list']));
    this.actionsSubject.pipe(ofType(editUserSuccessAction)).subscribe(data => this.router.navigate(['', 'users', 'list']));
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.helperService.getBase64(file);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }

  submitForm() {
    switch (this.uploadImageType) {
      case ManageTypesEnum.Add:
        this.form.fileIds.setValue(this.fileList.map(file => file.uid));
        this.form.birthDate.setValue(this.datePipe.transform(this.form.birthDate.value, 'yyy-MM-dd'));
        this.store.dispatch(createUserAction({request: this.form.getCreateModel()}));
        break;
      case ManageTypesEnum.Edit:
        this.form.birthDate.setValue(this.datePipe.transform(this.form.birthDate.value, 'yyy-MM-dd'));
        this.store.dispatch(editUserAction({id: this.id, request: this.form.getEditModel()}));
        break;
      case ManageTypesEnum.Preview:
        break;
    }
  }

  fileUploadSuccess(event) {
    if (event.type === 'removed') {
      this.filesService.deleteFile(event.file.uid).subscribe((data) => {
        this.fileList = this.fileList.filter(item => item.uid !== event.file.uid);
      });
    } else if (event.type === 'success') {
      event.fileList.forEach(file => {
        if (file.response?.length) {
          file.url = `${environment.apiUrl}${file.response[0].url}`
          this.fileList.find(item => item.uid === file.uid).uid = file.response[0].id;
        }
      });
    }
  }
}
