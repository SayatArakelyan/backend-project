import {on} from '@ngrx/store';
import {
  createUserAction,
  createUserFailureAction,
  createUserSuccessAction
} from '@pages/users/store/actions/users-create.actions';
import {adapter} from '@pages/users/store/users-initial.state';
import {IUserStateModel} from '@pages/users/store/users-state.interface';

export const createUser = on(
  createUserAction,
  (state: IUserStateModel): IUserStateModel => {
    return {
      ...state,
      isCreatingUser: true,
      validationErrors: null
    };
  });

export const createUserSuccess = on(
  createUserSuccessAction,
  (state: IUserStateModel, {response}): IUserStateModel => {
    return adapter.addOne(response, {
      ...state,
      isCreatingUser: false,
      validationErrors: null
    });
  });

export const createUserFailure = on(
  createUserFailureAction,
  (state: IUserStateModel, {errorResponse}): IUserStateModel => {
    return {
      ...state,
      isCreatingUser: false,
      validationErrors: errorResponse
    };
  });
