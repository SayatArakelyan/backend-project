import {on} from '@ngrx/store';
import {adapter} from '@pages/users/store/users-initial.state';
import {
  getUsersListAction,
  getUsersListFailureAction,
  getUsersListSuccessAction
} from '@pages/users/store/actions/users-list.actions';
import {IUserStateModel} from '@pages/users/store/users-state.interface';

export const getUsersList = on(
  getUsersListAction,
  (state: IUserStateModel): IUserStateModel => {
    return {
      ...state,
      isGettingUsersList: true,
      validationErrors: null
    };
  });

export const getUsersListSuccess = on(
  getUsersListSuccessAction,
  (state: IUserStateModel, {response}): IUserStateModel => {
    return adapter.upsertMany(response, {
      ...state,
      entities: {},
      ids: [],
      isGettingUsersList: false,
      validationErrors: null
    });
  }
);

export const getUsersListFailure = on(
  getUsersListFailureAction,
  (state: IUserStateModel, {errorResponse}): IUserStateModel => {
    return {
      ...state,
      isGettingUsersList: false,
      validationErrors: errorResponse
    };
  });
