import {on} from '@ngrx/store';
import {
  getOneUserAction,
  getOneUserFailureAction,
  getOneUserSuccessAction
} from '@pages/users/store/actions/users-get-one.actions';
import {adapter} from '@pages/users/store/users-initial.state';
import {IUserStateModel} from '@pages/users/store/users-state.interface';

export const getOneUser = on(
  getOneUserAction,
  (state: IUserStateModel): IUserStateModel => {
    return {
      ...state,
      isGettingOneUser: true,
      validationErrors: null
    };
  });

export const getOneUserSuccess = on(
  getOneUserSuccessAction,
  (state: IUserStateModel, {response}): IUserStateModel => {
    return adapter.upsertOne(response, {
      ...state,
      isGettingOneUser: false,
      validationErrors: null
    });
  });

export const getOneUserFailure = on(
  getOneUserFailureAction,
  (state: IUserStateModel, {errorResponse}): IUserStateModel => {
    return {
      ...state,
      isGettingOneUser: false,
      validationErrors: errorResponse
    };
  });
