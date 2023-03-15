import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {ListComponent} from './pages/list/list.component';
import {ManageComponent} from './pages/manage/manage.component';
import {SharedModule} from '@shared/shared.module';
import {CommonModule, DatePipe} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from '@pages/users/store/users.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UsersListEffects} from '@pages/users/store/effects/users-list.effects';
import {UsersCreateEffects} from '@pages/users/store/effects/users-create.effects';
import {UsersGetOneEffects} from '@pages/users/store/effects/users-get-one.effects';
import {UsersDeleteEffects} from '@pages/users/store/effects/users-delete.effects';
import {UsersEditEffects} from '@pages/users/store/effects/users-edit.effects';

@NgModule({
  declarations: [UsersComponent, ListComponent, ManageComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([
      UsersListEffects,
      UsersCreateEffects,
      UsersGetOneEffects,
      UsersDeleteEffects,
      UsersEditEffects
    ])
  ],
  providers: [DatePipe]
})
export class UsersModule {
}
