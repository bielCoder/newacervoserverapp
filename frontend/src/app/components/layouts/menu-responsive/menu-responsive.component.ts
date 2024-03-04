import { Component, OnInit, Output } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { LoginService } from 'src/app/services/login.service';

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

  constructor() { }

  ngOnInit(): void {
      this.logged = window.sessionStorage.getItem('name');
      this.access = sessionStorage.getItem('access') || '';
      this.access = CryptoJS.AES.decrypt(this.access, 'access').toString(CryptoJS.enc.Utf8);
  }

  onReceiveShowHide()
  {
    this.showHide = !this.showHide
  }

}