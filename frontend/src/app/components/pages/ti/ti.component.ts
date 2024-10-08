import { Component, Input, OnInit, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from 'src/app/interfaces/users';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../utilities/dialogs/users/edit-dialog/dialog.component';
import { CreateDialogComponent } from '../../utilities/dialogs/users/create-dialog/create-dialog.component';



@Component({
  selector: 'app-ti',
  templateUrl: './ti.component.html',
  styleUrls: ['./ti.component.css']
})
export class TIComponent implements OnInit {


  // variables receive data

  users!: any;
  @Output() paginator!:any;
  success!: any;
  search!:any;
  @Output() alpha:string = 'users';
  trueOrFalse: boolean = false;
  order: string =  'asc';
  data: Date = new Date();
  orderByIcon: string = 'bi bi-arrow-down-up';
  
  constructor(private tiService: UsersService, private router: Router, public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    // apresentando dados na tela
    this.allUsers();
    // messageria
      this.success = window.localStorage.getItem('message')
      window.localStorage.removeItem('message');
  
    // set search users
     this.tiService.search().subscribe(
      (data) => {
        this.search = data;
        this.search = this.search.users.data.filter((data: Users) => {
          return data.access === 1
        })
      }
    )

  
  }
// todos os usuários
  allUsers()
  {
    this.tiService.all().subscribe(
      (data: Users[]) => {
        this.users = data;
        this.paginator = this.users.users.data[0]
        this.users = this.users.users.data[0].data
        
      },(error) => {
        console.log(error)
      }
    );
  }
// campo busca
  onSearch(event:any)
  {     
        if(event === '')
        {
          this.users = this.paginator.data.filter((data: Users) => {
              return data.access === 1
          });
        }
        this.users = this.search.filter((user: Users) => {
          return user.name.toLowerCase().includes(event);
        })
  }
// paginação
  nextPage(event:any)
  {
    this.users = event.users.data[0].data
  }
// página cadastrar
  navigateRegister()
  {
    this.dialog.open(CreateDialogComponent,{
      width: '50%',
      height:'auto',
      position:{top: '3em'},
      disableClose:true,
    })
  }

  // abre o modal de atualização de dados
   openDialog(element: HTMLElement)
  {
    this.dialog.open(DialogComponent,{
      width: '50%',
      height:'auto',
      position:{top: '3em'},
      disableClose:true,
      data:element})

  }


  // Order BY

  changeOrderBy()
  {
    this.trueOrFalse = !this.trueOrFalse;
    if(!this.trueOrFalse)
    {
      this.order = 'asc';
    } else {
      this.order = 'desc'
    }

    this.tiService.orderBy(this.order).subscribe(
      (data: any) => {
        this.users = data;
        this.paginator = this.users.users.data[0]
        this.users = this.users.users.data[0].data
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
