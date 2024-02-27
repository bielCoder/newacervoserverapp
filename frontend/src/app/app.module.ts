
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { MessageErrorComponent } from './components/utilities/message-error/message-error.component';
import { TIComponent } from './components/pages/ti/ti.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './components/layouts/header/header.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { MenuResponsiveComponent } from './components/layouts/menu-responsive/menu-responsive.component';
import { SearchComponent } from './components/utilities/search/search.component';


// utilities

import { MatPaginatorIntlPtBr } from './components/utilities/paginator/paginator-ptbr-i8n';
import { MatPaginatorIntl } from '@angular/material/paginator';

// components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorComponent } from './components/utilities/paginator/paginator.component';
import { LoadingComponent } from './components/utilities/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { AdminComponent } from './components/pages/admin/admin.component';
import { CollaboratorsComponent } from './components/pages/collaborators/collaborators.component';
import { DialogComponent } from './components/utilities/dialogs/users/edit-dialog/dialog.component';
import { ResetDialogComponent } from './components/utilities/dialogs/users/reset-dialog/reset-dialog.component';
import { OperatorsComponent } from './components/pages/operators/operators.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductDialogComponent } from './components/utilities/dialogs/products/edit-product-dialog/product-dialog.component';
import { CreateDialogComponent } from './components/utilities/dialogs/users/create-dialog/create-dialog.component';
import { CreateProductDialogComponent } from './components/utilities/dialogs/products/create-product-dialog/create-product-dialog.component';
import { WithdrawComponent } from './components/pages/withdraw/withdraw.component';
import { CreateWithdrawComponent } from './components/utilities/dialogs/create-withdraw/create-withdraw.component';
import { GiveBackComponent } from './components/pages/give-back/give-back.component';
import { HistoricComponent } from './components/pages/historic/historic.component';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageErrorComponent,
    TIComponent,
    HeaderComponent,
    FooterComponent,
    MenuResponsiveComponent,
    SearchComponent,
    PaginatorComponent,
    LoadingComponent,
    AdminComponent,
    CollaboratorsComponent,
    OperatorsComponent,
    ProductsComponent,
    DialogComponent,
    ResetDialogComponent,
    ProductDialogComponent,
    CreateDialogComponent,
    CreateWithdrawComponent,
    CreateProductDialogComponent,
    WithdrawComponent,
    GiveBackComponent,
    HistoricComponent

  ],
  imports: [
  AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  exports: [MenuResponsiveComponent,],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlPtBr
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
