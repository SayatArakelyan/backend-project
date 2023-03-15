import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IFileModel} from './res/file.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  controller = `${environment.apiUrl}/api/files`;

  constructor(private httpClient: HttpClient) {
  }

  createFile(file: IFileModel): Observable<IFileModel> {
    return this.httpClient.post<IFileModel>(this.controller, file);
  }

  deleteFile(id: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.controller}/${id}`);
  }
}
