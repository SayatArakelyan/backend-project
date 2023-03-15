import {createAction, props} from '@ngrx/store';
import {UsersActionTypesEnum} from '../users-action-types.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {IUserModel} from '@api/users/res/user.interface';

export const editUserAction = createAction(
  UsersActionTypesEnum.EditUserAction,
  props<{ id: string, request: any }>()
);

export const editUserSuccessAction = createAction(
  UsersActionTypesEnum.EditUserSuccessAction,
  props<{ response: IUserModel }>()
);

export const editUserFailureAction = createAction(
  UsersActionTypesEnum.EditUserFailureAction,
  props<{ errorResponse: HttpErrorResponse }>()
);
