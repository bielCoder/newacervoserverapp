import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../edit-dialog/dialog.component';
import { Users } from 'src/app/interfaces/users';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrl: './reset-dialog.component.css'
})
export class ResetDialogComponent implements OnInit {
  dialogForm!: FormGroup
  success!: string;
  message!: any;
  error!:string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, 
    private usersServices: UsersService, 
    private router: Router,
    private dialog: MatDialog
    ){}

    ngOnInit(): void {
      this.dialogForm = this.formBuilder.group({
        id: new FormControl(this.data.id,[Validators.required]),
        password: new FormControl(this.dialogForm?.value.password,[Validators.required]),
        password_confirm: new FormControl(this.dialogForm?.value.password,[Validators.required])
      })
    }

    closeModal()
    {
      this.dialog.closeAll();
    }

    onSubmit(data: FormGroup)
    {
      if(data.value.password !== data.value.password_confirm)
      {
        this.error = '* Senhas não conferem.';
        return;
      }

      this.usersServices.resetPassword(data.value).subscribe(
        (data) => {
          this.message = data;
          this.message = this.message.users.message
          window.localStorage.setItem('message', this.message);
          this.dialog.closeAll();
          window.history.go();
        }
      )
    }
}
