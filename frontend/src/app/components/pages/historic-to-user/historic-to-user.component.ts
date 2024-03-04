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
import { Historics } from 'src/app/interfaces/historics';


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
        this.users = this.users.users.data[0]
      
        //  historic to user
        this.historicsService.show(this.users.register).subscribe(
          (data) => {
            this.products = data;
            this.paginator = this.products.historics.data
            this.products = this.products.historics.data.data
            
          }
        )
      }
    )


    this.historicsService.search().subscribe(
      (data) => {
          this.search = data;
          this.search = this.search.historics.data.filter((data: Historics) => {
            return data.register == this.users?.register
        })
      }
    )
 
  }

   // campo busca
   onSearch(event:any)
   {     
       this.products = this.search.filter((data: Historics) => {
        return data.product.toLowerCase().includes(event) || data.code.toLowerCase().includes(event) ||  data.brand.toLowerCase().includes(event);
       })
   }

  nextPage(event: any)
  {
    this.products = event.historics.data.data
  }

  
}
