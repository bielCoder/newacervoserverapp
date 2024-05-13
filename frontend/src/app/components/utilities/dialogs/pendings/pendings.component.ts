import { Component, Inject, OnInit, Output } from '@angular/core';
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

    users!: any[]; 
    currentPage!: string;
    @Output() paginator!:any;
    @Output() alpha:string = 'products/whoispending/';


    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private router: Router)
    {
        
    }
    
    ngOnInit(): void {
      this.users = this.data.withdraw.users
      this.paginator = this.data.withdraw.users[0].user;
      const currentUrl = this.router.url;
      this.currentPage = currentUrl;
      this.alpha += `${this.data.withdraw.products[0].id}`
    

    }


    closeModal()
    {
      this.dialog.closeAll();
    }

    redirectUseProduct(id: number)
    {
     this.dialog.closeAll()
     this.router.navigate([`give-back/${id}`])
    }

    nextPage(event: any)
    {
      this.users = event.users.data
    }
}
