import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { ResetDialogComponent } from '../reset-dialog/reset-dialog.component';
import { LoginService } from 'src/app/services/login.service';
import { access } from 'fs';



@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.css'
})
export class CreateDialogComponent implements OnInit {

  createUserForms!: FormGroup
  access!:string | null;
  passwordNotValid!:string | undefined;
  success!: any;
  error!:any;
  object!: any;
  message!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, 
    private usersService: UsersService, 
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService
    ){}


 async ngOnInit(): Promise<void> {
  this.createUserForms = this.formBuilder.group({
    name: new FormControl(null,[Validators.required]),
    register:new FormControl(null,[Validators.required]),
    function:new FormControl(null,[Validators.required]),
    department:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required]),
    password_confirm:new FormControl(null,[Validators.required]),
    access: null
 });

    //  get access session
    this.access = window.sessionStorage.getItem('access');
  }

  onSubmitCreate()
  {
   
    this.passwordNotValid = undefined;
    if(!this.createUserForms.valid)
    {
      return
    }

    if(this.createUserForms.controls['password'].value != this.createUserForms.controls['password_confirm'].value)
    {
      this.passwordNotValid = '* Senhas não conferem.'
      return;
    } 
   
    this.usersService.store(this.createUserForms.value).subscribe(
      (data) => {
        this.error = undefined;
        this.success = data;
        this.success = this.success.users.message
        window.localStorage.setItem('message', this.success);
        this.dialog.closeAll();
        window.history.go();

      },(data) => {
        this.success = undefined;
       this.error = data.message;
      }
    )
  }

  closeModal()
  {
    this.dialog.closeAll();
    window.localStorage.removeItem('message');
  }

  
}
