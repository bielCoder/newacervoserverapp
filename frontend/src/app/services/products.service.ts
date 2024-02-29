import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products = `${environment.server}/products`
  constructor(private http: HttpClient) { }

  all():Observable<Products[]>
  {
    return this.http.get<Products[]>(this.products);
  }

  search():Observable<Products[]>
  {
    return this.http.get<Products[]>(`${this.products}/search`);
  }

  edit(product: Products): Observable<Products>
  {
    return this.http.put<Products>(`${this.products}/${product.id}`,product);
  }

  store(data: Products): Observable<Products>
  {
    return this.http.post<Products>(`${this.products}/create`,data);
  }

  find(id: number): Observable<Products>
  {
    return this.http.get<Products>(`${this.products}/${id}`);
  }

  orderBy(order: string):Observable<Products>
  {
    const object = {
      "order": order
    }
    return this.http.put<Products>(`http://10.3.0.140/public/api/products/orderby`,object);
  }
}
