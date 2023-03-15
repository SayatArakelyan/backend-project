import {Component, OnInit} from '@angular/core';
import {ManageTypesEnum} from '@enums/manage-types.enum';
import {Observable} from 'rxjs';
import {IUserModel} from '@api/users/res/user.interface';
import {UserService} from '@api/users/user.service';
import {select, Store} from '@ngrx/store';
import {getUsersListAction} from '@pages/users/store/actions/users-list.actions';
import {usersListSelector} from '@pages/users/store/selectors/users.selectors';
import {deleteUserAction} from '@pages/users/store/actions/users-delete.actions';
import {UsersHelperService} from '@pages/users/services/users-helper.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  ManageTypesEnum = ManageTypesEnum;
  list$: Observable<IUserModel[]>;
  visibleFirstNameFilter = false;
  visibleLastNameFilter = false;
  visibleEmailFilter = false;
  visibleStatusFilter = false;
  visibleBirthDateFilter = false;

  constructor(public userService: UserService, private store: Store, public helperService: UsersHelperService) {
    this.list$ = this.store.pipe(select(usersListSelector));
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.store.dispatch(getUsersListAction());
  }

  deleteUser(id: string | any): void {
    this.store.dispatch(deleteUserAction({id}));
  }
}
