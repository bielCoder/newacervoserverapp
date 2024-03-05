import { Component, OnInit, Output } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Products } from 'src/app/interfaces/products';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-menu-responsive',
  templateUrl: './menu-responsive.component.html',
  styleUrls: ['./menu-responsive.component.css']
})
export class MenuResponsiveComponent implements OnInit {

  showHide: boolean = false; 
  logged!: string | null;
  access!: any;
  id!: string | null;
  pending!:any;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
      this.logged = window.sessionStorage.getItem('name');
      this.access = sessionStorage.getItem('access') || '';
      this.access = CryptoJS.AES.decrypt(this.access, 'access').toString(CryptoJS.enc.Utf8);

      this.productService.search().subscribe(
        (data) => {
          this.pending = data;
          this.pending = this.pending.products.data.filter((data: Products) => {
            return data.pending == true;
          })
          this.pending = this.pending.length;
        }
      )
  }

  onReceiveShowHide()
  {
    this.showHide = !this.showHide
  }

}