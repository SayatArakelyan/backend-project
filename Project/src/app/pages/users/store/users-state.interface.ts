import {EntityState} from '@ngrx/entity';
import {HttpErrorResponse} from '@angular/common/http';
import {IUserModel} from '@api/users/res/user.interface';

export interface IUserStateModel extends EntityState<IUserModel> {
  isCreatingUser: boolean;
  isEditingUser: boolean;
  isDeletingUser: boolean;
  isGettingUsersList: boolean;
  isGettingOneUser: boolean;
  validationErrors: HttpErrorResponse | null;
}
