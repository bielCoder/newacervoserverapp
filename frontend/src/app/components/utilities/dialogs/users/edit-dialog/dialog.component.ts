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
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

  dialogForm!: FormGroup
  accessSession!:string | null;
  object!: any;
  message!: any;
  error!: any;
  access!:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, 
    private usersServices: UsersService, 
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService
    ){}


 async ngOnInit(): Promise<void> {
    this.dialogForm = this.formBuilder.group({
      id: this.data.id,
      name: new FormControl( this.data.name,[Validators.required]),
      register: new FormControl( this.data.register,[Validators.required]),
      function: new FormControl( this.data.function,[Validators.required]),
      department: new FormControl(this.data.department,[Validators.required]),
      email: new FormControl(this.data.email,[Validators.required]),
      access: this.data.access
    })
    this.accessSession = window.sessionStorage.getItem('access');
  }

  onSubmit(data: FormGroup)
  {  
    this.usersServices.edit(data.value).subscribe(

      (data) => {
        this.object = data;
        this.message = this.object.users.message
        window.localStorage.setItem('message', this.message);
        this.dialog.closeAll();
        window.history.go();

      },(error) => {
        this.error = error.message
      }
    )
  }

  closeModal()
  {
    this.dialog.closeAll();
    window.localStorage.removeItem('message');
  }


  openModalResetPassword()
  {
    this.dialog.closeAll()
   this.dialog.open(ResetDialogComponent,{
    width: '500px',
    height:'auto',
    position:{top: '100px'},
    disableClose:true,
    data:{
      id: this.data.id, 
      name:  this.data.name,
      register: this.data.register,
      function: this.data.function,
      department: this.data.department,
      email: this.data.email,
      access: this.data.access
      }})
   }

   redirectUseProduct(id: number)
   {
    this.dialog.closeAll()
    this.router.navigate([`give-back/${id}`])
   }

   redirectHistoricToUser(id: number)
   {
      this.dialog.closeAll();
      this.router.navigate([`historic-to-user/${id}`]);
   }
  
}