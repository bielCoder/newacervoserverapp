import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/interfaces/products';
import { Users } from 'src/app/interfaces/users';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { WithdrawService } from 'src/app/services/withdraw.service';
import { CreateWithdrawComponent } from '../../utilities/dialogs/create-withdraw/create-withdraw.component';
import { HistoricsService } from 'src/app/services/historics.service';


@Component({
  selector: 'app-historic-to-user',
  templateUrl: './historic-to-user.component.html',
  styleUrl: './historic-to-user.component.css'
})
export class HistoricToUserComponent {
  products: any;
  users: any;
  search:any;
  paginator!: any;
  alpha: string = "historics";
  data: Date = new Date();

  

  @ViewChild('lignProduct') lignProduct!: ElementRef
  @ViewChild('userSearchInputProduct') userSearchInputProduct!: ElementRef

  
  constructor(private userService: UsersService, private route: ActivatedRoute, private historicsService: HistoricsService)
  {
   
  }

  ngOnInit(): void {
    // find user
    this.userService.find(this.route.snapshot.params['id']).subscribe(
      (data) => {
        this.users = data;
        this.users = this.users.users.data

        //  historic to user
        this.historicsService.show(this.users[0].register).subscribe(
          (data) => {
            this.products = data;
            this.paginator = this.products.historics.data
            this.products = this.products.historics.data.data
          }
        )
      }
    )
    
 
 

 
  }


  nextPage(event: any)
  {
    console.log(event);
  }

  
}
