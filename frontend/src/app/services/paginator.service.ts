import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/interfaces/users';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor(private http: HttpClient) { }

  handlePage(index:number,size:number,alpha:string): Observable<Users[]>
  {
    return this.http.get<Users[]>(`${environment.server}/${alpha}?page=${index}&per_page=${size}`)
  }

}
