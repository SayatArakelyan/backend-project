import {Injectable} from '@angular/core';
import {UserStatusTypesEnum} from '@enums/user-status-types.enum';
import {NzUploadFile} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class UsersHelperService {

  userStatuses = [
    {
      label: 'Lead',
      value: UserStatusTypesEnum.Lead
    },
    {
      label: 'Demo',
      value: UserStatusTypesEnum.Demo
    },
    {
      label: 'Client',
      value: UserStatusTypesEnum.Client
    }
  ];

  constructor() {
  }

  getBase64(file: NzUploadFile | Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
