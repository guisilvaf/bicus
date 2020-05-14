import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  public getWorks(): Observable<any> {
    return this.http.get('http://localhost:8080/api/works/');
  }

  public addUser(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/', data);
  }
}
