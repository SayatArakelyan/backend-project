import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {IUserStateModel} from './users-state.interface';
import {IUserModel} from '@api/users/res/user.interface';

export const adapter: EntityAdapter<IUserModel> = createEntityAdapter<IUserModel>();

export const usersInitialState: IUserStateModel = adapter.getInitialState(
  {
    isGettingUsersList: false,
    isGettingOneUser: false,
    isCreatingUser: false,
    isEditingUser: false,
    isDeletingUser: false,
    validationErrors: null,
  }
);
