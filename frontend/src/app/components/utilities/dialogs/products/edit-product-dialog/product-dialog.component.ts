import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css'
})
export class ProductDialogComponent implements OnInit {

  dialogForm!: FormGroup


  @ViewChild('radio') radioTrue!: ElementRef
  @ViewChild('radio') radioFalse!: ElementRef

  showHideDescription!: boolean;


  object: any;
  message!: string;
  error!: string;



  constructor( @Inject(MAT_DIALOG_DATA) public data: Products, private formBuilder: FormBuilder, private dialog: MatDialog, private productService: ProductsService){}

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
      breakdown: `${this.data.breakdown}`,
      description: new FormControl(this.data.description)
    })

    if(!this.data.breakdown)
    {
      this.showHideDescription = false;
    } else {
      this.showHideDescription = true;

    }
  }

  closeModal()
  {
    this.dialog.closeAll();
  }

  onChangeRadio(event: any)
  {
    if(event.getAttribute('ng-reflect-value') === '0')
    {
      this.showHideDescription = false;
    } else {
      this.showHideDescription = true;

    }
  }

  onSubmit(data: FormGroup)
  {
    if(data.value.breakdown == '1')
    {
      data.value.breakdown = true;
    } else {
      data.value.breakdown = false;
    }
   
    if(!this.showHideDescription)
    {
      data.value.description = null
    }

    this.productService.edit(data.value).subscribe(

      (data) => {
        this.object = data;
     
        this.message = this.object.products.message
        window.localStorage.setItem('message', this.message);
        this.dialog.closeAll();
        window.history.go();

      },(error) => {
        this.error = error.message
      }
    )
    console.log(data)
  }
}
