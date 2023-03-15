import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {createUserAction, createUserFailureAction, createUserSuccessAction} from '../actions/users-create.actions';
import {IUserModel} from '@api/users/res/user.interface';
import {UserService} from '@api/users/user.service';

@Injectable({
  providedIn: 'root'
})

export class UsersCreateEffects {

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUserAction),
      switchMap(({request}) => {
        return this.usersService.createUser(request).pipe(
          map((response: IUserModel) => {
            return createUserSuccessAction({response});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(createUserFailureAction({errorResponse}));
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
