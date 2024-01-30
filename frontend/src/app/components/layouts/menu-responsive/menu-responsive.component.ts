import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-responsive',
  templateUrl: './menu-responsive.component.html',
  styleUrls: ['./menu-responsive.component.css']
})
export class MenuResponsiveComponent implements OnInit {

  showHide: boolean = false; 
  logged!: string | null;
  access!: string | null;
  id!: string | null;

  constructor() { }

  ngOnInit(): void {
    this.logged = window.sessionStorage.getItem('name');
    this.access = window.sessionStorage.getItem('access');
  }

  onReceiveShowHide()
  {
    this.showHide = !this.showHide
  }

}
