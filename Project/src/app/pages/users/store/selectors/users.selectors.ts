import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IUserStateModel} from '@pages/users/store/users-state.interface';
import {adapter} from '@pages/users/store/users-initial.state';
import {IAppStateModel} from '@shared/interfaces/I-app-state.interface';

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const usersFeatureSelector = createFeatureSelector<IAppStateModel,
  IUserStateModel>
('users');

export const isCreatingUserSelector = createSelector(
  usersFeatureSelector,
  (state: IUserStateModel) => state.isCreatingUser
);

export const isEditingUserSelector = createSelector(
  usersFeatureSelector,
  (state: IUserStateModel) => state.isEditingUser
);

export const usersListSelector = createSelector(
  usersFeatureSelector,
  (state: IUserStateModel) => selectAll(state)
);

export const userSelector = createSelector(
  usersFeatureSelector,
  (state: IUserStateModel, id: string) => state.entities[id]
);
