import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {IUserModel} from '@api/users/res/user.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {getOneUserAction, getOneUserFailureAction, getOneUserSuccessAction} from '../actions/users-get-one.actions';
import {UserService} from '@api/users/user.service';

@Injectable({
  providedIn: 'root'
})

export class UsersGetOneEffects {

  getOneUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOneUserAction),
      switchMap(({id}) => {
        return this.usersService.getUserById(id).pipe(
          map((response: IUserModel) => {
            return getOneUserSuccessAction({response});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getOneUserFailureAction({errorResponse}));
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
