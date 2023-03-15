import {IFileModel} from '@api/files/res/file.interface';
import {UserStatusTypesEnum} from '@enums/user-status-types.enum';

export interface IUserModel {
  id?: string;
  firstName: string;
  lastName: string;
  ipAddress: string | null;
  email: string;
  birthDate: string;
  status: UserStatusTypesEnum;
  files?: IFileModel[];
  fileIds?: string[];
}
