import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {editUserAction, editUserFailureAction, editUserSuccessAction} from '../actions/users-edit.actions';
import {UserService} from '@api/users/user.service';
import {IUserModel} from '@api/users/res/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersEditEffects {

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserAction),
      switchMap(({id, request}) => {
        return this.usersService.editUser(id, request).pipe(
          map((response: IUserModel) => {
            return editUserSuccessAction({response});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(editUserFailureAction({errorResponse}));
          })
        );
      })
    ));

  constructor(
    private usersService: UserService,
    private actions$: Actions,
  ) {
  }
}
