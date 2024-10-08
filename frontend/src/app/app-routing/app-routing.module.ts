import { Route, Router, RouterModule, Routes, UrlSegment, UrlTree } from '@angular/router';
import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/pages/auth/login/login.component';
import { TIComponent } from '../components/pages/ti/ti.component';
import { MainGuard } from '../guards/main.guard';
import { AdminComponent } from '../components/pages/admin/admin.component';
import { CollaboratorsComponent } from '../components/pages/collaborators/collaborators.component';
import { OperatorsComponent } from '../components/pages/operators/operators.component';
import { UsersService } from '../services/users.service';
import { ProductsComponent } from '../components/pages/products/products.component';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs';
import { AccessDeniedComponent } from '../components/utilities/httpStatusTemplate/access-denied/access-denied.component';
import { WithdrawComponent } from '../components/pages/withdraw/withdraw.component';
import { GiveBackComponent } from '../components/pages/give-back/give-back.component';
import { HistoricComponent } from '../components/pages/historic/historic.component';
import { HistoricToUserComponent } from '../components/pages/historic-to-user/historic-to-user.component';
import * as CryptoJS from 'crypto-js';
import { PendingComponent } from '../components/pages/pending/pending.component';




const routes: Routes = [
  {
    path: '',component: LoginComponent,
  },
  {
    path: 'home',
    component: TIComponent,
    canActivate: [MainGuard],
    canMatch: [() => {
      const permission = inject(LoginService)
      let session = window.sessionStorage.getItem('access') || '';
      session = CryptoJS.AES.decrypt(session.toString(), 'access').toString(CryptoJS.enc.Utf8);
      if(session == '1')
      {
        permission.changeRootTrue();
        return permission.isRoot$;
      } else {
        window.sessionStorage.clear()
        const router = inject(Router)
        permission.changeRootFalse()
        return permission.isRoot$.pipe(map(isRoot => isRoot || router.navigate(['access-denied'])));
      }
      } 
  ]
},{
    path: 'admin',
    component: AdminComponent,
    canActivate: [MainGuard],
    canMatch: [() => {
      let session = window.sessionStorage.getItem('access') || '';
      session = CryptoJS.AES.decrypt(session.toString(), 'access').toString(CryptoJS.enc.Utf8);
      const permission = inject(LoginService)
      if( session == '1' || session == '2' )
      {
        permission.changeAdminTrue();
        return permission.isAdmin$;
      } else {
        // window.sessionStorage.clear()
        const router = inject(Router)
        permission.changeAdminFalse()
        return permission.isAdmin$.pipe(map(isAdmin => isAdmin || router.navigate(['access-denied'])));
      }
      } 
  ]
  },
  {
    path: 'operators',
    component: OperatorsComponent,
    canActivate: [MainGuard],
    canMatch: [() => {
      let session = window.sessionStorage.getItem('access') || '';
      session = CryptoJS.AES.decrypt(session.toString(), 'access').toString(CryptoJS.enc.Utf8);
      const permission = inject(LoginService)
      if(
        session == '1' || 
        session == '2' ||
        session == '3' 
        )
      {
        permission.changeOperatorTrue();
        return permission.isOperator$;
      } else {
        const router = inject(Router)
        permission.changeOperatorFalse()
        // window.sessionStorage.clear()
        return permission.isOperator$.pipe(map(isOperator => isOperator || router.navigate(['access-denied'])));
      }
      } 
  ]
  },
  {
    path: 'collaborators',
    component: CollaboratorsComponent,
    canActivate: [MainGuard],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [MainGuard]
  },
  {
    path: 'pendings',
    component: PendingComponent,
    canActivate: [MainGuard]
  },
  {
    path: 'withdraw',
    component: WithdrawComponent,
    canActivate: [MainGuard]
  },
  {
    path: 'give-back/:id',
    component: GiveBackComponent,
    canActivate: [MainGuard]
  },
  {
    path: 'historic',
    component: HistoricComponent,
    canActivate: [MainGuard]
  },
  {
    path: 'historic-to-user/:id',
    component: HistoricToUserComponent,
    canActivate: [MainGuard]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '**', redirectTo: ''
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }