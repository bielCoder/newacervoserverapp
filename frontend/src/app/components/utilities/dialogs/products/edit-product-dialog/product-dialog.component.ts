import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent implements OnInit {

  dialogForm!: FormGroup

  private isWithdrawSubject = new BehaviorSubject<boolean>(false)
  isWithdraw$: Observable<boolean> = this.isWithdrawSubject.asObservable();

  private isGiveBackSubject = new BehaviorSubject<boolean>(false)
  isGiveBack$: Observable<boolean> = this.isGiveBackSubject.asObservable();

  @ViewChild('radio') radioTrue!: ElementRef
  @ViewChild('radio') radioFalse!: ElementRef

  showHideDescription!: boolean;


  object: any;
  message!: string;
  error!: string;
  router!:any;


  constructor( @Inject(MAT_DIALOG_DATA) public data: Products, private formBuilder: FormBuilder, private dialog: MatDialog, private productService: ProductsService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.dialogForm = this.formBuilder.group({
      id: new FormControl(this.data.id,[Validators.required]),
      product: new FormControl(this.data.product,[Validators.required]),
      code: new FormControl(this.data.code),
      brand: new FormControl(this.data.brand),
      size: new FormControl(this.data.size),
      sexo: new FormControl(this.data.sexo,[Validators.required]),
      color: new FormControl(this.data.color),
      amount: new FormControl(this.data.amount,[Validators.required]),
      observation: new FormControl(this.data.observation),
      breakdown: this.data.breakdown,
      description: new FormControl(this.data.description)
    })
    if(!this.data.breakdown)
    {
      this.showHideDescription = false;
    } else {
      this.showHideDescription = true;
    }
    
    if(this.route.children[0].snapshot.url[0].path == 'withdraw')
    {
      this.isWithdrawSubject.next(false)
    }

   

    const url = location.href;
    this.router = url.replace("http://localhost:4200/","")
   
  }

  closeModal()
  {
    this.dialog.closeAll();
  }

  onChangeRadio(event: any)
  {
    this.showHideDescription = !this.showHideDescription
   

    this.dialogForm.setValue({
      id: this.dialogForm.value.id,
      product:  this.dialogForm.value.product,
      code:  this.dialogForm.value.code,
      brand:  this.dialogForm.value.brand,
      size:  this.dialogForm.value.size,
      sexo:  this.dialogForm.value.sexo,
      color:  this.dialogForm.value.color,
      amount:  this.dialogForm.value.amount,
      observation:  this.dialogForm.value.observation,
      breakdown:  event.value,
      description:  this.dialogForm.value.description 
    })
  }

  onSubmit(data: FormGroup)
  {
  
    if(data.value.breakdown == 1)
    {
      data.value.breakdown = true;
    } else {
      data.value.breakdown = false;
    }

    this.dialogForm.setValue({
      id: data.value.id,
      product: data.value.product,
      code: data.value.code,
      brand: data.value.brand,
      size: data.value.size,
      sexo: data.value.sexo,
      color: data.value.color,
      amount: data.value.amount,
      observation: data.value.observation,
      breakdown: data.value.breakdown,
      description: data.value.description 
    })

   
    if(!this.showHideDescription)
    {
      data.value.description = null
    }

    this.productService.edit(this.dialogForm.value).subscribe(

      (data: any) => {
        this.object = data;
  
        this.message = this.object.products.message
        window.localStorage.setItem('message', this.message);
    
       
        const products = localStorage.getItem('products') || '';
        const items = products ? JSON.parse(products) : [];
        // this.dialog.closeAll();
        // window.location.reload();
        const usuarioIndex = items.findIndex((product: Products) =>  {return product.id === data.products.data.id});
        
        localStorage.setItem('products', JSON.stringify(items));
      
        if (usuarioIndex !== -1) {
        
          // Atualizar o nome do usuário
          items[usuarioIndex].observation = data.products.data.observation;
          items[usuarioIndex].breakdown = data.products.data.breakdown;
          items[usuarioIndex].description = data.products.data.description;

  
          // Atualizar os usuários no localStorage
          localStorage.setItem("products", JSON.stringify(items));
        
      } 

      location.reload();


      },(error) => {
        this.error = error.message
      }
    )
  }

  
}
