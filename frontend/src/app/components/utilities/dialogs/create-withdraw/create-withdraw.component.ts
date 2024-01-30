import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { WithdrawService } from './../../../../services/withdraw.service';

@Component({
  selector: 'app-create-withdraw',
  templateUrl: './create-withdraw.component.html',
  styleUrl: './create-withdraw.component.css'
})
export class CreateWithdrawComponent {

  formulario!: FormGroup
  object!: any;
  status!: number;
  error!:any;
  success:any;

  constructor(
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private loginService: LoginService, 
    private withdrawService:WithdrawService,
    public route: Router
    )
  { 
    this.formulario = formBuilder.group({
      register: new FormControl(data.withdraw.users.register,[Validators.required]),
      password: new FormControl(null,[Validators.required])
    })
  }


  closeModal()
  {
    this.dialog.closeAll();
  }

  onSubmit()
  {
    
   if(this.route.url === '/withdraw')
   {
      this.loginService.loginStore(this.formulario.value).subscribe(
      (data) => {
        this.object = data;
        if(this.object.users.status === 202)
        {
          this.withdrawService.store(this.data).subscribe(
            (data) => {
              this.error = undefined;
              this.success = data;
              this.success = this.success.withdraw.message
              window.localStorage.setItem('message', this.success);
              this.dialog.closeAll();
              window.history.go();
            }
          )
        } else {
          return;
        }
      },(data) => {
        this.error = data.users.message
      }
    )
   } else {
    console.log('não entrei')
   }
   
  }
}
