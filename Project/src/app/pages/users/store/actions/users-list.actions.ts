import {createAction, props} from '@ngrx/store';
import {UsersActionTypesEnum} from '../users-action-types.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {IUserModel} from '@api/users/res/user.interface';

export const getUsersListAction = createAction(
  UsersActionTypesEnum.GetUsersListAction
);

export const getUsersListSuccessAction = createAction(
  UsersActionTypesEnum.GetUsersListSuccessAction,
  props<{ response: IUserModel[] }>()
);

export const getUsersListFailureAction = createAction(
  UsersActionTypesEnum.GetUsersListFailureAction,
  props<{ errorResponse: HttpErrorResponse }>()
);
