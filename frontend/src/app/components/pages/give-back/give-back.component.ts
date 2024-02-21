import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/interfaces/products';
import { Users } from 'src/app/interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { CreateWithdrawComponent } from '../../utilities/dialogs/create-withdraw/create-withdraw.component';
import { ActivatedRoute } from '@angular/router';
import { WithdrawService } from 'src/app/services/withdraw.service';


@Component({
  selector: 'app-give-back',
  templateUrl: './give-back.component.html',
  styleUrl: './give-back.component.css'
})
export class GiveBackComponent implements OnInit {
    allProducts:any;
    products: any;
    users: any;
    productsInUse: any;
    search:any;
    searchTwo:any;
    paginator!: any;
    productsList:any = [];
    alpha: string = "products";
    failed!: any;
    success!: any;
    data: Date = new Date();
  
    

    @ViewChild('lignProduct') lignProduct!: ElementRef
    @ViewChild('userSearchInputProduct') userSearchInputProduct!: ElementRef

    
    constructor(private userService: UsersService, private dialogs: MatDialog, private route: ActivatedRoute, private backDrop: WithdrawService, private productsService: ProductsService)
    {

    }

    ngOnInit(): void {
      // find user
      this.userService.find(this.route.snapshot.params['id']).subscribe(
        (data) => {
          this.users = data;
          this.users = this.users.users.data
        }
      )
      
      // find products in use
      
      this.backDrop.show(this.route.snapshot.params['id']).subscribe(
        (data) => {
          this.productsInUse = data;
          this.productsInUse = this.productsInUse?.withdraw.data;      
        }
      )

      // all products

      this.productsService.search().subscribe(
        (data) => {
          this.allProducts = data;
          this.allProducts = this.allProducts.products.data
        }
      )

      // clear message 

      window.localStorage.removeItem('message');
      this.success = null;

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

    const productReturn = this.allProducts.filter((data: Products) => {
      return data.id === id
    })

    this.productsInUse.sort((a:number,b:number) => {
      return a > b;
     });
    
    this.productsInUse.push(productReturn[0]);
  }

  onCartRemove(id: number)
  {
  
    this.productsInUse = this.productsInUse.filter((data: Products) => {
      return data.id !== id
    })

   const findProduct = this.allProducts.filter((data: Products) => {
     return data.id == id
    });
   
    
    const exists = this.productsList.filter((data: Products) => {
      return data.id == id;
    })

    if(exists.length !== 0)
    {
      return
    }

    this.productsList.push(findProduct[0])

  }




}
