import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrl: './create-product-dialog.component.css'
})
export class CreateProductDialogComponent implements OnInit {

  dialogForm!: FormGroup


  showHideDescription: boolean = false;

  object: any;
  success!: any;
  error!: any;

  @ViewChild('codeInput') codeInput!: ElementRef;



  constructor( @Inject(MAT_DIALOG_DATA) public data: Products, private formBuilder: FormBuilder, private dialog: MatDialog, private productService: ProductsService){}

  ngOnInit(): void {
    this.dialogForm = this.formBuilder.group({
      product: new FormControl(null,[Validators.required]),
      code: new FormControl(null,[Validators.required]),
      brand: new FormControl(null),
      size: new FormControl(null),
      sexo: new FormControl(null,[Validators.required]),
      color: new FormControl(null),
      observation: new FormControl(null),
      breakdown: 0,
      description: new FormControl(null),
      pending:0,
      amount: new FormControl(1)
    })
  }

  closeModal()
  {
    this.dialog.closeAll();
  }

  onChangeRadio()
  {
    this.showHideDescription = !this.showHideDescription
  }

  codeGenerator()
  {
    var stringAleatoria = '';
    var caracteres = '0123456789';
    for (var i = 0; i < 6; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        this.codeInput.nativeElement.value = stringAleatoria
        this.dialogForm.controls['code'].setValue(stringAleatoria)
    }
  }

  onSubmit(data: FormGroup)
  {
    this.productService.store(data.value).subscribe(
      (value) => {
        this.error = undefined;
        this.success = value;
        this.success = this.success.products.message
        window.localStorage.setItem('message', this.success);
        this.dialog.closeAll();
        window.history.go();

      },(data) => {
        this.success = undefined;
       this.error = data.message;
      }
    )
  }
}
