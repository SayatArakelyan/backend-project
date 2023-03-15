import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {UsersActionTypesEnum} from '../users-action-types.enum';
import {IUserModel} from '@api/users/res/user.interface';

export const getOneUserAction = createAction(
  UsersActionTypesEnum.GetOneUserAction,
  props<{ id: string }>()
);

export const getOneUserSuccessAction = createAction(
  UsersActionTypesEnum.GetOneUserSuccessAction,
  props<{ response: IUserModel }>()
);

export const getOneUserFailureAction = createAction(
  UsersActionTypesEnum.GetOneUserFailureAction,
  props<{ errorResponse: HttpErrorResponse }>()
);
