import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interface/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  private cache: { [url: string]: any } = {};

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    const url = `${this.baseUrl}?page=${page}`;
    return this.getData(url);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.getData(url);
  }

  private getData(url: string): Observable<any> {
    if (this.cache[url]) {
      return of(this.cache[url]);
    } else {
      return this.http.get(url).pipe(
        map(response => {
          this.cache[url] = response;
          return response;
        }),
        catchError(error => {
          return of(null);
        })
      );
    }
  }
}
