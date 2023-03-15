import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUserModel} from '../res/user.interface';

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class ManageUserModel {
  id = new FormControl('');
  firstName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  email = new FormControl('', [Validators.required, Validators.pattern(emailRegExp), Validators.maxLength(100)]);
  status = new FormControl(null, [Validators.required]);
  birthDate = new FormControl(null, [Validators.required]);
  files = new FormControl([]);
  fileIds = new FormControl([]);

  formGroup = new FormGroup({
    id: this.id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    status: this.status,
    birthDate: this.birthDate,
    files: this.files
  });

  getCreateModel(): IUserModel {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      status: this.status.value,
      birthDate: this.birthDate.value,
      ipAddress: localStorage.getItem('ip'),
      fileIds: this.fileIds.value
    };
  }

  getEditModel(): IUserModel {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      status: this.status.value,
      birthDate: this.birthDate.value,
      ipAddress: localStorage.getItem('ip'),
    };
  }

  disableAllControls() {
    this.firstName.disable();
    this.lastName.disable();
    this.email.disable();
    this.status.disable();
    this.birthDate.disable();
  }
}
