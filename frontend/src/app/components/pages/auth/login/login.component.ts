import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login.service';
import { Auth } from 'src/app/interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // variable with defined class
  authForm!: FormGroup

  // data variable
  userData!: any;
  token!: string;
  name!:string;
  access!: any;

  // access message variables
  @Output() failed!: string;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // iniciando o formulário
    this.authForm = this.formBuilder.group({
      register: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required])
    });
  }

  onSubmit()
  {
    // colocando dados em objeto
    const user: Auth = {
      register: this.authForm.controls['register'].value,
      password: this.authForm.controls['password'].value
    }

    // validando se campos estão preenchidos

    if(this.authForm.invalid)
    {
      return;
    } 
    // resposta de dados diretamente do banco
    return this.loginService.loginStore(user).subscribe(
      (data) => {
        this.failed = '';
        this.userData = data;
        this.token = this.userData.users.token;
        this.name = this.userData.users.data?.name;
        this.access = this.userData.users.data?.access;

        window.sessionStorage.setItem("token",this.token);
        window.sessionStorage.setItem("name",this.name);
        window.sessionStorage.setItem("access",this.access);

        this.access = window.sessionStorage.getItem('access');
        
        


        switch(this.access)
        {
          case '1' :  return this.router.navigate([`/home`]);
          case '2' : return this.router.navigate([`/admin`]);
          case '3' : return this.router.navigate([`/operators`]);
          case '4' : return this.router.navigate([`/collaborators`]);
          default: return;
        }
       
      },(error) =>
      {
       this.failed = error.users.message
       
      }
    );
  }
}
