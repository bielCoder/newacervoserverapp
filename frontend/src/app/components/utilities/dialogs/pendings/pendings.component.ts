import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Users } from 'src/app/interfaces/users';
import { CreateWithdrawComponent } from '../create-withdraw/create-withdraw.component';


@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrl: './pendings.component.css'
})
export class PendingsDialogComponent implements OnInit {

    user!: Users 

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, )
    {

    }
    
    ngOnInit(): void {
      this.user = this.data.withdraw.users
    }


    closeModal()
    {
      this.dialog.closeAll();
    }

    openModalDevolution()
    {
      this.dialog.open(CreateWithdrawComponent,{
        width: '45vw',
        height:'auto',
        position:{ top:'100px'},
        disableClose:true,
        data: this.data
      })
    }
}
