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
  orderByIcon: string = 'bi bi-arrow-down-up';
  @Output() paginator!:any;
  @Output() alpha:string = "historics"
  trueOrFalse: boolean = false;
  order: string =  'asc';


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
            this.paginator = this.historics.historics?.data
            this.historics = this.historics.historics.data?.data;
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
        width: '40vw',
        height:'auto',
        position:{top: '100px'},
        disableClose:true,
        data:{withdraw: {users: this.whoIsLogged, products: []}}})
     
  
    });


    
  }


  changeOrderBy()
  {
    this.trueOrFalse = !this.trueOrFalse;
    if(!this.trueOrFalse)
    {
      this.order = 'asc';
    } else {
      this.order = 'desc'
    }

    this.historicsService.orderBy(this.order).subscribe(
      (data: any) => {
        this.historics = data;
        this.historics = this.historics.historics.data.data;
            this.paginator = this.historics.historics.data
        console.log(this.historics)
    
   
  
      },(error) => {
        console.log(error)
      }
    );
  }

  effectIconOrderBYOver()
  {
    // get elements by class
   const twoArrows = document.getElementsByClassName('bi bi-arrow-down-up');

   const upArrow = document.getElementsByClassName('bi bi-arrow-up')

   const upDown = document.getElementsByClassName('bi bi-arrow-down')


  //  set visibilities
   for(let i=0; i < twoArrows.length; i++)
   {
    twoArrows[i].setAttribute('style','display:none');
   }

   for(let i=0; i < upArrow.length; i++)
   {
    upArrow[i].setAttribute('style','display:inline');
   }

   for(let i=0; i < upDown.length; i++)
   {
    upDown[i].setAttribute('style','display:inline');
   }
    
  }

  effectIconOrderBYOut()
  {
    // get elements by class
   const twoArrows = document.getElementsByClassName('bi bi-arrow-down-up');

   const upArrow = document.getElementsByClassName('bi bi-arrow-up')

   const upDown = document.getElementsByClassName('bi bi-arrow-down')


  //  set visibilities
   for(let i=0; i < twoArrows.length; i++)
   {
    twoArrows[i].setAttribute('style','display:inline');
   }

   for(let i=0; i < upArrow.length; i++)
   {
    upArrow[i].setAttribute('style','display:none');
   }

   for(let i=0; i < upDown.length; i++)
   {
    upDown[i].setAttribute('style','display:none');
   }
    
  }

 

}