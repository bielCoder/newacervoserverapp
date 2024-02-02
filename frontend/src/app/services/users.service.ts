import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { environment } from './../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
 
  private users = `${environment.server}/users`;
  private storeUsers = `${environment.server}/users/register`;


  constructor(private http: HttpClient) {}

  all(): Observable<Users[]>
  {
    return this.http.get<Users[]>(this.users);
  }

  store(data: Users[]): Observable<Users[]>
  {
    return this.http.post<Users[]>(this.storeUsers,data)
  }

  edit(data:Users):Observable<Users>
  {
    return this.http.put<Users>(`${this.users}/${data.id}`,data);
  }

  search():Observable<Users[]>
  {
    return this.http.get<Users[]>(`${this.users}/search`);
  }

  resetPassword(data: Users): Observable<Users>
  {
    return this.http.put<Users>(`${this.users}/reset/${data.id}`,data);
  }

  find(id: string):Observable<Users>
  {
    return this.http.get<Users>(`${this.users}/${id}`)
  }

  orderBy(order: string):Observable<Users>
  {
    const object = {
      "order": order
    }
    return this.http.put<Users>(`http://10.3.0.140/public/api/users/orderby`,object);
  }
}
