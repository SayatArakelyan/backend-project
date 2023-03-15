import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {deleteUserAction, deleteUserFailureAction, deleteUserSuccessAction} from '../actions/users-delete.actions';
import {UserService} from '@api/users/user.service';

@Injectable({
  providedIn: 'root'
})

export class UsersDeleteEffects {

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserAction),
      switchMap(({id}) => {
        return this.usersService.deleteUser(id).pipe(
          map(() => {
            return deleteUserSuccessAction({id});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(deleteUserFailureAction({errorResponse}));
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
