import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/interfaces/products';
import { Users } from 'src/app/interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { CreateWithdrawComponent } from '../../utilities/dialogs/create-withdraw/create-withdraw.component';
import { ProductDialogComponent } from '../../utilities/dialogs/products/edit-product-dialog/product-dialog.component';

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
    data: Date = new Date();
    productListSession:any = [];
    observation!:any;

    @ViewChild('lignProduct') lignProduct!: ElementRef
    @ViewChild('userSearchInputProduct') userSearchInputProduct!: ElementRef

    
    constructor(private userService: UsersService, private productService: ProductsService, private dialogs: MatDialog,  public dialog: MatDialog)
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
            return data.pending == true
          })

          this.search = this.search.products.data.filter((data: Products) => {
            return data.pending == false
          })


          this.products = this.search;
        }
      )

         // messageria
         this.success = window.localStorage.getItem('message')
         window.localStorage.removeItem('message');

        // Mantem usuário na página
        const user = localStorage.getItem("user") || '';
        this.users = JSON.parse(user)
        
      //  Mantem produto na página
        const product = localStorage.getItem("products") || '';
        this.productListSession = JSON.parse(product); 


     
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
          localStorage.setItem("user",JSON.stringify(this.users));
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

    const exists = this.productListSession.filter((value: Products) => {
          return value.code === data.value
    })

    if(exists.length !== 0)
    {
      return
    }
    
    this.productsList.push(find[0]);
    this.productListSession.push(find[0])
    localStorage.setItem("products",JSON.stringify(this.productsList));
    this.userSearchInputProduct.nativeElement.value = ''
    
  }

  
 

  removeProductList(id: number)
  {
    this.productsList = this.productsList.filter((data: Products) => {
        return data.id !== id;
    })
  }


  openDialog(element: Products)
  {
    this.dialog.open(ProductDialogComponent,{
      width: '50%',
      height:'auto',
      position:{top: '5em'},
      disableClose:true,
      data: element
    })
  }

  submitDialog(data: Products[], users: Users)
  {
    const withdraw ={ withdraw : {
      products: data,
      users: users
    }}
 
    this.dialogs.open(CreateWithdrawComponent,{
      width: '50%',
      height:'auto',
      position:{top: '3em'},
      disableClose:true,
      data: withdraw
    })


  }
}