import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/interfaces/products';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../utilities/dialogs/products/edit-product-dialog/product-dialog.component';
import { CreateProductDialogComponent } from '../../utilities/dialogs/products/create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  object!:any;
  products!:Products[]
  paginator!: any
  alpha: string = "products"
  search:any;
  success!: string | null;

  data: Date = new Date();


  constructor(private productService: ProductsService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.allProducts();
          // messageria
          this.success = window.localStorage.getItem('message')
          window.localStorage.removeItem('message');

     // set search users
     this.productService.search().subscribe(
      (data) => {
        this.search = data;
        this.search = this.search.products.data.filter((data: Products) => {
          return data.low == false
        })
      }
    )
  }

  allProducts()
  {
    this.productService.all().subscribe(
      (data) => {
        this.object = data;
        this.products = this.object.products.data.data.filter((data:Products) => {
          return data.low == false
        });
        this.paginator = this.object.products.data
      }
    );
  }

  // campo busca
  onSearch(event:any)
  {     
        if(event === '')
        {
          this.products = this.paginator.data.filter((data: Products) => {
              return data.low === false
          });
        }
        this.products = this.search.filter((products: Products) => {
          return products.product.toLowerCase().includes(event) && products.low == false;
        })
  }

  nextPage(event: any)
  {
    this.products = event.products.data.data
  }

  createProduct()
  {
    this.dialog.open(CreateProductDialogComponent,{
      width: '700px',
      height:'auto',
      position:{top: '100px'},
      disableClose:true,
    })
  }

  openDialog(element: Products)
  {
    this.dialog.open(ProductDialogComponent,{
      width: '600px',
      height:'auto',
      position:{top: '100px'},
      disableClose:true,
      data: element
    })
  }
}
