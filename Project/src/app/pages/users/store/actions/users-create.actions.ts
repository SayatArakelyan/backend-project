import {createAction, props} from '@ngrx/store';
import {UsersActionTypesEnum} from '../users-action-types.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {IUserModel} from '@api/users/res/user.interface';

export const createUserAction = createAction(
  UsersActionTypesEnum.CreateUserAction,
  props<{ request: any }>()
);

export const createUserSuccessAction = createAction(
  UsersActionTypesEnum.CreateUserSuccessAction,
  props<{ response: IUserModel }>()
);

export const createUserFailureAction = createAction(
  UsersActionTypesEnum.CreateUserFailureAction,
  props<{ errorResponse: HttpErrorResponse }>()
);
