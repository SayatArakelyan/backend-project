import {on} from '@ngrx/store';
import {adapter} from '@pages/users/store/users-initial.state';
import {
  editUserAction,
  editUserFailureAction,
  editUserSuccessAction
} from '@pages/users/store/actions/users-edit.actions';
import {IUserStateModel} from '@pages/users/store/users-state.interface';

export const editUser = on(
  editUserAction,
  (state: IUserStateModel): IUserStateModel => {
    return {
      ...state,
      isEditingUser: true,
      validationErrors: null
    };
  });

export const editUserSuccess = on(
  editUserSuccessAction,
  (state: IUserStateModel, {response}): IUserStateModel => {
    return adapter.upsertOne(response, {
      ...state,
      isEditingUser: false,
      validationErrors: null
    });
  });

export const editUserFailure = on(
  editUserFailureAction,
  (state: IUserStateModel, {errorResponse}): IUserStateModel => {
    return {
      ...state,
      isEditingUser: false,
      validationErrors: errorResponse,
    };
  });
