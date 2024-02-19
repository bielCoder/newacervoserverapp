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
        this.search = this.search.products.data
      }
    )
  }

  allProducts()
  {
    this.productService.all().subscribe(
      (data) => {
        this.object = data;
        this.products = this.object.products.data.data
        this.paginator = this.object.products.data
      }
    );
  }

  // campo busca
  onSearch(event:any)
  {     
     this.products = this.search.filter((data: Products) => {
      return data.product.toLowerCase().includes(event) && data.pending == false;
     })
  }

  nextPage(event: any)
  {
    this.products = event.products.data.data
  }

  createProduct()
  {
    this.dialog.open(CreateProductDialogComponent,{
      width: '50%',
      height:'auto',
      position:{top: '3em'},
      disableClose:true,
    })
  }

  openDialog(element: Products)
  {
    this.dialog.open(ProductDialogComponent,{
      width: '50%',
      height:'auto',
      position:{top: '3em'},
      disableClose:true,
      data: element
    })
  }
}
