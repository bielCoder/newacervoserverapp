import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'src/app/interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = `${environment.server}/users/login`;
  private logoutUrl = `${environment.server}/users/logout`;

  private isRootSubject =  new BehaviorSubject<boolean>(false);
  isRoot$: Observable<boolean> = this.isRootSubject.asObservable();

  private isAdminSubject =  new BehaviorSubject<boolean>(false);
  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

  private isOperatorSubject =  new BehaviorSubject<boolean>(false);
  isOperator$: Observable<boolean> = this.isOperatorSubject.asObservable();

  private isCollaboratorSubject =  new BehaviorSubject<boolean>(false);
  isCollaborator$: Observable<boolean> = this.isCollaboratorSubject.asObservable();


  constructor(private http: HttpClient) {}

  loginStore(userData: Auth): Observable<Auth>
  {
     return this.http.post<Auth>(this.loginUrl,userData);
  }

  logout(token: string | null): Observable<Auth>
  {
    return this.http.post<Auth>(this.logoutUrl,token);
  }

  changeRootTrue()
  {
    this.isRootSubject.next(true);
  }

  changeRootFalse()
  {
    this.isRootSubject.next(false);
  }

  changeAdminTrue()
  {
    this.isAdminSubject.next(true);
  }

  changeAdminFalse()
  {
    this.isAdminSubject.next(false);
  }

  changeOperatorTrue()
  {
    this.isOperatorSubject.next(true);
  }

  changeOperatorFalse()
  {
    this.isOperatorSubject.next(false);
  }

  changeCollaboratorTrue()
  {
    this.isCollaboratorSubject.next(true);
  }

  changeCollaboratorFalse()
  {
    this.isCollaboratorSubject.next(false);
  }
  
}
