import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class WithdrawService {

 private withdraw = `${environment.server}/withdraw`;

  constructor(private http: HttpClient) { }

  store(value: any)
  {
    return this.http.post(`${this.withdraw}/store`,value);
  }

  show(id: number): Observable<Products[]>
  {
    return this.http.get<Products[]>(`${environment.server}/withdraw/${id}`);
  }
}
