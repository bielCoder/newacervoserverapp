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
import { ProductDialogComponent } from '../../utilities/dialogs/products/edit-product-dialog/product-dialog.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


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
    alpha: string = "withdraw";
    failed!: any;
    success!: any;
    data: Date = new Date();
    formulario!: FormGroup;
    

    @ViewChild('lignProduct') lignProduct!: ElementRef
    @ViewChild('userSearchInputProduct') userSearchInputProduct!: ElementRef

    
    constructor(private userService: UsersService, private dialogs: MatDialog, private route: ActivatedRoute, private backDrop: WithdrawService, private productsService: ProductsService, private formBuilder: FormBuilder)
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

       // message
       this.success = window.localStorage.getItem('message')
       window.localStorage.removeItem('message');


       this.formulario = this.formBuilder.group({
        amount: new FormControl(1)
    })

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

  counterMore(id:number)
  {

      const objectAmount =this.productsInUse[0].amount.filter((data: any) => {
        return data.product_id === id;
      })

      const find = this.productsList.filter((data: Products) => {
        return data.id === id;
      })
     
      if(find[0].amount >= objectAmount[0].amount)
      {
        const findProduct = document.getElementsByClassName(`${id} limit`);
        if (findProduct.length > 0) {
          findProduct[0].innerHTML = "* Quantidade Excedida";
        }
        return
      }
       

      find[0].amount = find[0].amount + 1;
      
      this.formulario.setValue({
        amount: find[0].amount
      });
     
  }


  counterLess(id: number)
  {
    const findProduct = document.getElementsByClassName(`${id} limit`);
    if (findProduct.length > 0) {
      findProduct[0].innerHTML = "";
    }
    const find = this.productsList.filter((data: Products) => {
      return data.id === id;
    })

    if(find[0].amount <= 1)
    {
      return
    }

    find[0].amount = find[0].amount - 1;

    this.formulario.setValue({
      amount: find[0].amount
    });

  }

  counterVerifyValidation(object: any,id: number)
  {
    const find = this.productsList.filter((data: Products) => {
      return data.id === id;
    })

    if(find[0].amount <= 1)
    {
      return
    }
    find[0].amount = object.value;   
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
    const productsListAdd = this.productsList.filter((data: Products) => {
      return data.id === id
    })
    
    this.productsInUse[0].product.push(productsListAdd[0])
    this.productsInUse[0].product.sort((a: any, b: any) => a.id - b.id);

    this.productsList = this.productsList.filter((data: Products) => {
        return data.id !== id
      })
   
  }
  
 

  onCartRemove(id: number)
  {
    const objectAmount =this.productsInUse[0].amount.filter((data: any) => {
      return data.product_id === id;
    })
   
    // this.productsList.push(find[0]);
    // Encontrar o índice do item a ser removido
    const index = this.productsInUse[0].product.findIndex((item: any) => item.id === id);

     // Verificar se o item foi encontrado
     if (index !== -1) {
      // Remover o item do array
      const removedItem = this.productsInUse[0].product.splice(index, 1)[0];
      removedItem.amount = objectAmount[0].amount
      // Adicionar o item removido de volta à lista de produtos
      this.productsList.push(removedItem);
      this.productsList.sort((a: any, b: any) => a.id - b.id);

   
    }
  }


  openDialog(element: Products)
  {
    this.dialogs.open(ProductDialogComponent,{
      width: '50%',
      height:'auto',
      position:{top: '5em'},
      disableClose:true,
      data: element
    })
  }


  returnEverything()
  {
   // Mover todos os itens de productsInUse para productsList
   while (this.productsInUse[0].product.length > 0) {
    // Remove o primeiro item de productsInUse e armazena-o em removedItem
    const removedItem = this.productsInUse[0].product.splice(0, 1)[0];

    // Encontre o valor de amount correspondente a este item em productsInUse
    const objectAmount = this.productsInUse[0].amount.find((data: any) => {
      return data.product_id === removedItem.id;
    });

    // Se o valor de amount for encontrado, defina-o no item removido
    if (objectAmount) {
      removedItem.amount = objectAmount.amount;
    }

    // Adiciona o item removido de volta à lista de produtos
    this.productsList.push(removedItem);
  }

  // Ordena productsList após adicionar todos os itens
  this.productsList.sort((a: any, b: any) => a.id - b.id);
  }





}
