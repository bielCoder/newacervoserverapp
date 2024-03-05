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
  products!:any;
  paginator!: any;
  alpha: string = "products";
  search:any;
  success!: string | null;
  orderByIcon: string = 'bi bi-arrow-down-up';
  data: Date = new Date();
  trueOrFalse: boolean = false;
  order: string =  'asc';
  total!: number;
  available!: number;
  unavailable!: number;

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
        this.total = this.search.length;
        this.available = this.search.filter((data: Products) => {return data.pending == false}).length
        this.unavailable = this.search.filter((data: Products) => {return data.pending == true}).length
      
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

    this.productService.orderBy(this.order).subscribe(
      (data: any) => {
        this.products = data;
        this.paginator = this.products.products.data.data
        this.products = this.products.products.data.data
      },(error) => {
        console.log(error)
      }
    );
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
