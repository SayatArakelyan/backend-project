import {on} from '@ngrx/store';
import {
  deleteUserAction,
  deleteUserFailureAction,
  deleteUserSuccessAction
} from '@pages/users/store/actions/users-delete.actions';
import {adapter} from '@pages/users/store/users-initial.state';
import {IUserStateModel} from '@pages/users/store/users-state.interface';

export const deleteUser = on(
  deleteUserAction,
  (state: IUserStateModel): IUserStateModel => {
    return {
      ...state,
      isDeletingUser: true,
      validationErrors: null
    };
  });

export const deleteUserSuccess = on(
  deleteUserSuccessAction,
  (state: IUserStateModel, {id}): IUserStateModel => {
    return adapter.removeOne(id, {
      ...state,
      isDeletingUser: false,
      validationErrors: null
    });
  });

export const deleteUserFailure = on(
  deleteUserFailureAction,
  (state: IUserStateModel, {errorResponse}): IUserStateModel => {
    return {
      ...state,
      isDeletingUser: false,
      validationErrors: errorResponse,
    };
  });
