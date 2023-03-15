import {Action, createReducer} from '@ngrx/store';
import {usersInitialState} from '@pages/users/store/users-initial.state';
import {getUsersList, getUsersListFailure, getUsersListSuccess} from '@pages/users/store/reducers/users-list.reducers';
import {deleteUser, deleteUserFailure, deleteUserSuccess} from '@pages/users/store/reducers/users-delete.reducers';
import {getOneUser, getOneUserFailure, getOneUserSuccess} from '@pages/users/store/reducers/users-get-one.reducers';
import {editUser, editUserFailure, editUserSuccess} from '@pages/users/store/reducers/users-edit.reducers';
import {createUser, createUserFailure, createUserSuccess} from '@pages/users/store/reducers/users-create.reducers';
import {IUserStateModel} from '@pages/users/store/users-state.interface';

const initReducer = createReducer(
  usersInitialState,
  getUsersList,
  getUsersListSuccess,
  getUsersListFailure,
  getOneUser,
  getOneUserSuccess,
  getOneUserFailure,
  editUser,
  editUserSuccess,
  editUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  createUser,
  createUserSuccess,
  createUserFailure
);


export function usersReducer(state: IUserStateModel, action: Action): any {
  return initReducer(state, action);
}
