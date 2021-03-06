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

  public getWorkers(): Observable<any> {
    return this.http.get('http://localhost:8080/api/workers/');
  }

  public login(data): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/login/', data);
  }

  public getUserByCPF(cpf): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users/${cpf}`);
  }

  public update(data): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users/update`, data);
  }

  public recoveryPassword(email, password): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users/recovery/${email}/${password}`);
  }
}
