import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Historics } from 'src/app/interfaces/historics';
import { Users } from 'src/app/interfaces/users';
import { HistoricsService } from 'src/app/services/historics.service';
import { UsersService } from 'src/app/services/users.service';
import { PendingsDialogComponent } from '../../utilities/dialogs/pendings/pendings.component';


@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrl: './historic.component.css'
})
export class HistoricComponent implements OnInit {

  historics:any;

  data: Date = new Date();
  success!: any;
  search: any;
  download!: any;
  whoIsLogged!: any;
  
  @Output() paginator!:any;
  @Output() alpha:string = "users"

  constructor(private historicsService: HistoricsService,private usersService: UsersService, public dialog: MatDialog){}

  ngOnInit(): void {
        // timer messageria
        this.success = window.localStorage.getItem('message')
        setInterval(() => {
          window.localStorage.removeItem('message');
        },5000)

        // all historics
        this.historicsService.index().subscribe(
          (data: Historics[]) => {
            this.historics = data;
            this.paginator = this.historics.historics.data
            this.historics = this.historics.historics.data.data;
          }
        );


        // search

        this.historicsService.search().subscribe(
          (data) => {
            this.search = data;
            this.search = this.search.historics.data;
          }
        )


        
  }

  // campo busca
  onSearch(event:any)
  {     
      this.historics = this.search.filter((data: Historics) => {
      return data.name.toLowerCase().includes(event) || 
      data.register.toLowerCase().includes(event) || 
      data.product.toLowerCase().includes(event) || 
      data.code.toLowerCase().includes(event) ||  
      data.brand.toLowerCase().includes(event) 
      && data.pending == false;
      })
  }


  // paginação
  nextPage(event:any)
  {
    this.historics = event.historics.data.data;
  }


  onWhoIsLogged(data: string)
  {
    if(data === '' || data === null)
    {
      return
    }
    this.usersService.find(data).subscribe((dataService: Users) => {
       this.whoIsLogged = dataService;
       this.whoIsLogged = this.whoIsLogged;
       this.whoIsLogged = this.whoIsLogged.users.data[0];

        this.dialog.open(PendingsDialogComponent,{
        width: '35vw',
        height:'auto',
        position:{top: '100px'},
        disableClose:true,
        data:{withdraw: {users: this.whoIsLogged, products: []}}})
  
    });


    
  }
 

}