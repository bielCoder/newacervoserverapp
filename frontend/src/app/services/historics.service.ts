import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Historics } from '../interfaces/historics';

@Injectable({
  providedIn: 'root'
})
export class HistoricsService {

  private historics = `${environment.server}/historics`;

  constructor(private http: HttpClient) { }

  index(): Observable<Historics[]>
  {
    return this.http.get<Historics[]>(this.historics);
  }

  search()
  {
    return this.http.get<Historics[]>(`${this.historics}/search`);
  }

  show(register: string): Observable<Historics[]>
  {
    return this.http.get<Historics[]>(`${this.historics}/${register}`);
  }

  orderBy(order: string):Observable<Historics[]>
  {
    const object = {
      "order": order
    }
    return this.http.put<Historics[]>(`${environment.server}/historics/orderby`,object);
  }
  
}
