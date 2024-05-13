import { Component, OnInit, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from 'src/app/interfaces/users';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../utilities/dialogs/users/edit-dialog/dialog.component';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/interfaces/products';
import { Historics } from 'src/app/interfaces/historics';
import { PendingsDialogComponent } from '../../utilities/dialogs/pendings/pendings.component';



@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  products!:any;
  success!: string | null;

  // variables receive data


  @Output() paginator!:any;
  @Output() alpha:string = 'products/pendings';

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
          this.search = this.search.products.data.filter((data: Products) => {
            return data.pending == true;
          })
        }
      )

      // messageria
      this.success = window.localStorage.getItem('message')
      window.localStorage.removeItem('message');


      
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

    this.products = this.search.filter((data: Products) => {
        return data.product.toLowerCase().includes(event) || data.product.toUpperCase().includes(event) || 
        data.code.toLowerCase().includes(event) || data.code.toUpperCase().includes(event) ||
        data.brand.toLowerCase().includes(event) || data.brand.toUpperCase().includes(event)
    })
  }
// paginação
  nextPage(event:any)
  {
    this.products = event.products.data.data
  }

  // Order BY

   changeOrderBy()
   {
    this.trueOrFalse = !this.trueOrFalse;
    if(!this.trueOrFalse)
    {
      this.order = 'asc';
    } else {
      this.order = 'desc'
    }
    this.productService.orderByPending(this.order).subscribe(
      (data: any) => {
        this.products = data;
        this.paginator = this.products.products.data
        this.products = this.products.products.data.data
      },(error) => {
        console.log(error)
      })
   }

  //  Count days in uso

  dataConfig(days: Date)
  {
            // Datas de exemplo
        const dataInicial = new Date();
        const dataFinal = new Date(days);

        // Calcula a diferença em milissegundos
        const diffInMs = dataFinal.valueOf() - dataInicial.valueOf();

        // Converte a diferença em dias
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        let datePositive: number = Math.abs(diffInDays)
        datePositive = Math.trunc(datePositive);


        return datePositive + ` ${datePositive > 1 || datePositive == 0 ? 'dias' : 'dia'}`;   
      
  }


  openDialog(element: Products)
  {
    this.productService.whoIsPending(element).subscribe((data: any) => {
      this.dialog.open(PendingsDialogComponent,{
        width: '50vw',
        maxHeight:'50vh',
        position:{top: '100px'},
        disableClose:true,
        data:{withdraw: {users: data.users.data, products: [element]}}})

    })
   
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
