import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppHelperService {

  constructor(private httpClient: HttpClient) {
  }

  setIp(): void {
    this.httpClient.get('https://api.ipify.org/?format=json').subscribe((data: any) => {
      localStorage.setItem('ip', data.ip);
    });
  }
}
