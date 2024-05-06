import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Users } from 'src/app/interfaces/users';
import { CreateWithdrawComponent } from '../create-withdraw/create-withdraw.component';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrl: './pendings.component.css'
})
export class PendingsDialogComponent implements OnInit {

    user!: Users 
    currentPage!: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private router: Router)
    {

    }
    
    ngOnInit(): void {
      this.user = this.data.withdraw.users
      const currentUrl = this.router.url;
      this.currentPage = currentUrl;
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
