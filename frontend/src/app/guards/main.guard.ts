import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainGuard  {

  constructor(private router: Router)
  {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const token = window.sessionStorage.getItem('token');
      if(token)
      {
        return true
      } 
     
      this.router.navigate(['']);
     
      return false;

  }
  
}
