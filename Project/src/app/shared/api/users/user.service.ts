import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUserModel} from './res/user.interface';
import {UserStatusTypesEnum} from '@enums/user-status-types.enum';
import {DatePipe} from '@angular/common';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  controller = `${environment.apiUrl}/api/users`;
  firstNameFilter = '';
  lastNameFilter = '';
  birthDateFilter = '';
  emailFilter = '';
  statusFilter: UserStatusTypesEnum | string = '';

  constructor(private httpClient: HttpClient, private datePipe: DatePipe) {
  }

  getUsersList(): Observable<IUserModel[]> {
    let params = new HttpParams();
    if (this.firstNameFilter) {
      params = params.set('firstName', this.firstNameFilter);
    }
    if (this.lastNameFilter) {
      params = params.set('lastName', this.lastNameFilter);
    }
    if (this.emailFilter) {
      params = params.set('email', this.emailFilter);
    }
    if (this.statusFilter) {
      params = params.set('status', this.statusFilter);
    }
    if (this.birthDateFilter) {
      params = params.set('birthDate', this.datePipe.transform(this.birthDateFilter, 'yyy-MM-dd'));
    }

    return this.httpClient.get<IUserModel[]>(this.controller, {params});
  }

  getUserById(id: string): Observable<IUserModel> {
    return this.httpClient.get<IUserModel>(`${this.controller}/${id}`);
  }

  createUser(user: IUserModel): Observable<IUserModel> {
    return this.httpClient.post<IUserModel>(this.controller, user);
  }

  editUser(id: string, user: IUserModel): Observable<IUserModel> {
    return this.httpClient.put<IUserModel>(`${this.controller}/${id}`, user);
  }

  deleteUser(id: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.controller}/${id}`);
  }

  resetAllFilters(): void {
    this.firstNameFilter = '';
    this.lastNameFilter = '';
    this.birthDateFilter = '';
    this.emailFilter = '';
    this.statusFilter = '';
  }
}
