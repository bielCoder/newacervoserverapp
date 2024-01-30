import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 @Output() showHide: EventEmitter<any> = new EventEmitter();

  constructor(private logoutService: LoginService, private router: Router) { }

  ngOnInit(): void {}

  onLogout()
  {
    const token = window.sessionStorage.getItem('token');
    this.logoutService.logout(token).subscribe();
    window.sessionStorage.clear();
    this.router.navigate(['']);
  }

  onShowHide()
  {
    this.showHide.emit()
  }

}
