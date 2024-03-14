import { Component, OnInit, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from 'src/app/interfaces/users';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../utilities/dialogs/users/edit-dialog/dialog.component';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  products!:any;

  // variables receive data


  @Output() paginator!:any;
  @Output() alpha:string = 'products';

  search!:any;
  trueOrFalse: boolean = false;
  order: string =  'asc'
  data: Date = new Date();
  orderByIcon: string = 'bi bi-arrow-down-up';

  
  constructor(public dialog: MatDialog, private productService: ProductsService ) { 
    
  }

  ngOnInit(): void {
    // apresentando dados na tela
    this.productsPending();


      // set search users
      this.productService.search().subscribe(
        (data) => {
          this.search = data;
          this.search = this.search.products.data
        }
      )

      
  }
// todos os usuários
  productsPending()
  {
    this.productService.pendingProducts().subscribe(
      (data) => {
        this.products = data;
         this.paginator = this.products.products.data
        this.products = this.products.products.data.data
        
       
      }
    )
  }
// campo busca
  onSearch(event:any)
  {     
    console.log(event)
  }
// paginação
  nextPage(event:any)
  {
    
  }

  // Order BY

   changeOrderBy()
   {
    
   }

   effectIconOrderBYOver()
   {
     // get elements by class
    const twoArrows = document.getElementsByClassName('bi bi-arrow-down-up');
 
    const upArrow = document.getElementsByClassName('bi bi-arrow-up')
 
    const upDown = document.getElementsByClassName('bi bi-arrow-down')
 
 
   //  set visibilities
    for(let i=0; i < twoArrows.length; i++)
    {
     twoArrows[i].setAttribute('style','display:none');
    }
 
    for(let i=0; i < upArrow.length; i++)
    {
     upArrow[i].setAttribute('style','display:inline');
    }
 
    for(let i=0; i < upDown.length; i++)
    {
     upDown[i].setAttribute('style','display:inline');
    }
     
   }
 
   effectIconOrderBYOut()
   {
     // get elements by class
    const twoArrows = document.getElementsByClassName('bi bi-arrow-down-up');
 
    const upArrow = document.getElementsByClassName('bi bi-arrow-up')
 
    const upDown = document.getElementsByClassName('bi bi-arrow-down')
 
 
   //  set visibilities
    for(let i=0; i < twoArrows.length; i++)
    {
     twoArrows[i].setAttribute('style','display:inline');
    }
 
    for(let i=0; i < upArrow.length; i++)
    {
     upArrow[i].setAttribute('style','display:none');
    }
 
    for(let i=0; i < upDown.length; i++)
    {
     upDown[i].setAttribute('style','display:none');
    }
     
   }
}
