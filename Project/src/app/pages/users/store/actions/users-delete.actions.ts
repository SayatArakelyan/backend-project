import {createAction, props} from '@ngrx/store';
import {UsersActionTypesEnum} from '../users-action-types.enum';
import {HttpErrorResponse} from '@angular/common/http';

export const deleteUserAction = createAction(
  UsersActionTypesEnum.DeleteUserAction,
  props<{ id: string }>()
);

export const deleteUserSuccessAction = createAction(
  UsersActionTypesEnum.DeleteUserSuccessAction,
  props<{ id: string }>()
);

export const deleteUserFailureAction = createAction(
  UsersActionTypesEnum.DeleteUserFailureAction,
  props<{ errorResponse: HttpErrorResponse }>()
);
