import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from '@pages/users/pages/list/list.component';
import {ManageComponent} from '@pages/users/pages/manage/manage.component';
import {UsersComponent} from '@pages/users/users.component';
import {ManageTypesEnum} from '@enums/manage-types.enum';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: ManageTypesEnum.Add,
        component: ManageComponent,
      },
      {
        path: `${ManageTypesEnum.Edit}/:id`,
        component: ManageComponent,
      },
      {
        path: `${ManageTypesEnum.Preview}/:id`,
        component: ManageComponent
      },
      {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
