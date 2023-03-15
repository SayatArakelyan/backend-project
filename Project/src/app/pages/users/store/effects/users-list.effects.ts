import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IUserModel} from '@api/users/res/user.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {getUsersListAction, getUsersListFailureAction, getUsersListSuccessAction} from '../actions/users-list.actions';
import {UserService} from '@api/users/user.service';

@Injectable({
  providedIn: 'root'
})

export class UsersListEffects {

  getUsersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersListAction),
      switchMap(() => {
        return this.usersService.getUsersList().pipe(
          map((response: IUserModel[]) => {
            return getUsersListSuccessAction({response});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getUsersListFailureAction({errorResponse}));
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
