import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/interfaces/products';
import { Users } from 'src/app/interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { CreateWithdrawComponent } from '../../utilities/dialogs/create-withdraw/create-withdraw.component';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent implements OnInit {

    users: any;
    products: any;
    search:any;
    searchTwo:any;
    paginator!: any;
    productsList:any = [];
    alpha: string = "products";
    failed!: any;
    success!: any;
    

    @ViewChild('lignProduct') lignProduct!: ElementRef
    @ViewChild('userSearchInputProduct') userSearchInputProduct!: ElementRef

    
    constructor(private userService: UsersService, private productService: ProductsService, private dialogs: MatDialog)
    {

    }

    ngOnInit(): void {
      this.productService.all().subscribe(
        (data) => {
          this.products = data;
          this.paginator = this.products.products.data
          this.products = this.products.products.data.data.filter((data: Products) => {
            return data.pending == false && data.low == false;
          });
        }
      )

  
  
       // set search users
       this.productService.search().subscribe(
        (data) => {
          this.search = data;

          this.searchTwo = this.search.products.data.filter((data: Products) => {
            return data.low == false && data.pending == true
          })

          this.search = this.search.products.data.filter((data: Products) => {
            return data.low == false && data.pending == false
          })


          this.products = this.search;
        }
      )

         // messageria
         this.success = window.localStorage.getItem('message')
         window.localStorage.removeItem('message');
     
    }


    employeeSearch(id: HTMLInputElement)
    {
      if(id.value === '')
      {
        return;
      }

      this.userService.find(id.value).subscribe(
        (data) => {
          this.users = data;
          this.users = this.users.users.data
        }
      )

     
    }


  getProductSend(data: HTMLInputElement)
  {
    const find = this.search.filter((value: any) => {
      this.failed = undefined;
      return value.code == data.value
    })

    const findTwo = this.searchTwo.filter((value: any) => {
      this.failed = undefined;
      return value.code == data.value
    })


    if(findTwo.length !== 0)
    {
      this.failed = '* Produto está em uso'
    } 

    // verifica se o array está vazio
    if(find.length === 0)
    {
      return
    }

   

    // verificar se o produto já existe no carrinho

    const exists = this.productsList.filter((value: Products) => {
          return value.code === data.value
    })

    if(exists.length !== 0)
    {
      return
    }
    
    // empurra o objeto encontrado para o carrinho
    this.productsList.push(find[0])
    this.userSearchInputProduct.nativeElement.value = ''
  
  }

  
  submitDialog(data: Products[], users: Users)
  {
    const withdraw ={ withdraw : {
      products: data,
      users: users
    }}

    this.dialogs.open(CreateWithdrawComponent,{
      width: '45vw',
      height:'auto',
      position:{ top:'100px'},
      disableClose:true,
      data: withdraw
    })

  }

  removeProductList(id: number)
  {
    this.productsList = this.productsList.filter((data: Products) => {
        return data.id !== id;
    })
  }
}
