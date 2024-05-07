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
    alpha: string = "withdraw";
    failed!: any;
    success!: any;
    data: Date = new Date();
    productListSession:any = [];
    observation!:any;
    counter!:any;
    incrementLimit!: number;
    productFindById: any;

    @ViewChild('lignProduct') lignProduct!: ElementRef
    @ViewChild('userSearchInputProduct') userSearchInputProduct!: ElementRef
    @ViewChild('userSearchInput') userSearchInput!: ElementRef
    @ViewChild('amount') amount!: ElementRef


    
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
            return data.available === 0;
          })

          this.search = this.search.products.data.filter((data: Products) => {
            return data.available !== 0
          })


          this.products = this.search;

        }
      )

         // message
         this.success = window.localStorage.getItem('message')
         window.localStorage.removeItem('message');

        
        // keeps user on page
        const user = localStorage.getItem("user") || '';
        if(user)
        {
          this.users = JSON.parse(user)
        }
       
        

      // Keep product on page
        const product = localStorage.getItem("products") || '';
        
        if(product)
        {
          this.productListSession = JSON.parse(product); 
        }


       
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



    getProductSend(data: HTMLInputElement) {
      const find = this.search.filter((value: any) => {
          return value.code == data.value;
      });
    
      

      const findTwo = this.searchTwo.filter((value: any) => {
        this.failed = undefined;
        return value.code == data.value;
      });
    
      if (findTwo.length > 0) {
        this.failed = 'Indísponivel em Estoque.';
        return;
      }
      
      // Produto não encontrado
      if (find.length < 1) {
        this.failed = 'Produto não encontrado';
        return;
      }
    
      // Verificar se o produto já existe no carrinho
      const exists = this.productListSession.filter((value: Products) => {
        return value.code === data.value;
      });
    
      if (exists.length !== 0) {
        this.failed = 'Produto já foi adicionado no carrinho';
        return;
      } else {
        const newProduct = { ...find[0], amount: 1 }; // Inicializa amount com 1
     
        this.productsList.push(newProduct);
        this.productListSession.push(newProduct);
        localStorage.setItem('products', JSON.stringify(this.productsList));
      }
    
      this.userSearchInputProduct.nativeElement.value = '';
    }

 

  counterMore(id: number) {

  
  const productFind = this.search.find((product: Products) => product.id === id)
 
    // Recupere os dados do localStorage
    const productsString = localStorage.getItem("products") || '';
    const products: any[] = JSON.parse(productsString);
    
    // Função para filtrar um objeto pelo ID
    function filterProductById(id: number): any | undefined {
        // Encontre o objeto com base no ID
        return products.find(product => product.id === id);
    }
    
    // Exemplo: Filtrar o objeto com ID 1
    const productId = id;
    this.productFindById = filterProductById(productId);
    
    // Verifique se o objeto foi encontrado
    if (this.productFindById) {     
        // Defina o limite de incremento
        this.incrementLimit = productFind.available; // Defina o limite desejado
        
        // Verifique se a quantidade é um número válido
        if (!isNaN(this.productFindById.amount) && typeof this.productFindById.amount === 'number') {
            // Verifique se o incremento excede o limite
            if (this.productFindById.amount < this.incrementLimit) {
                // Incrementa a quantidade apenas se não exceder o limite
                this.productFindById.amount += 1; // Novo valor para a chave "amount"
                
                let find = document.getElementById(`${id}`);
                
                if (find) { 
                    find.textContent = this.productFindById.amount;
                }
                
                // Salve o objeto filtrado de volta no localStorage com a chave "products"
                localStorage.setItem("products", JSON.stringify(products));
            } else {
              let find = document.getElementsByClassName(`${id} limit`);
                
              find[0].innerHTML = "* Quantidade Excedida"
            }
        } else {
            // Se a quantidade não for válida, defina-a como 0 antes de incrementar
            this.productFindById.amount = 0;
            this.counterMore(id); // Chame a função novamente para tentar incrementar
        }
    }
}
  
    counterLess(id: number)
    {
  
      let find = document.getElementsByClassName(`${id} limit`);
                
      find[0].innerHTML = ""
      // Recupere os dados do localStorage
      const productsString = localStorage.getItem("products") || '';
      const products: any[] = JSON.parse(productsString);

      // Função para filtrar um objeto pelo ID
        function filterProductById(id: number): any | undefined {
        // Encontre o objeto com base no ID
        return products.find(product => product.id === id);
      }

      // Exemplo: Filtrar o objeto com ID 1
      const productId = id;
      const product = filterProductById(productId);

      // Verifique se o objeto foi encontrado
      if (product) {
        if(product.amount <= 1)
        {
          return;
        }

      // Altere o valor da chave "amount"
      product.amount =  product.amount - 1// Novo valor para a chave "amount"

        
     
    
      
      let find = document.getElementById(`${id}`)
      
      if(find)
      { 
        find.textContent = product.amount
      }
      // Salve o objeto filtrado de volta no localStorage com a chave "products"
      localStorage.setItem("products", JSON.stringify(products));
      }
    }

  
  
 

  removeProductList(id: number)
  {

    const findProduct = localStorage.getItem("products") || '';

    this.productListSession = JSON.parse(findProduct).filter((data: Products) => {
        return data.id !== id;
    })

    localStorage.setItem("products",JSON.stringify(this.productListSession));
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
    const products = localStorage.getItem('products') || '';

    const withdraw ={ withdraw : {
      products: JSON.parse(products),
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

  onChangedUser()
  {
    this.productListSession = [];
  }


}