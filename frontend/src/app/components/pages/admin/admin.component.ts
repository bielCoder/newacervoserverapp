import { Component, OnInit, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from 'src/app/interfaces/users';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../utilities/dialogs/users/edit-dialog/dialog.component';
import { CreateDialogComponent } from '../../utilities/dialogs/users/create-dialog/create-dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  // variables receive data

  users!: any;
  @Output() paginator!:any;
  success!: any;
  search!:any;
  @Output() alpha: string = 'users'

  trueOrFalse: boolean = false;
  order: string =  'asc'
  data: Date = new Date();
  orderByIcon: string = 'bi bi-arrow-down-up';
  
  constructor(private adminService: UsersService, private router: Router, public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    // apresentando dados na tela
    this.allUsers();
    // timer messageria
    this.success = window.localStorage.getItem('message')
    setInterval(() => {
      window.localStorage.removeItem('message');
    },5000)

    // set search users
     this.adminService.search().subscribe(
      (data) => {
        this.search = data;
        this.search = this.search.users.data.filter((data: Users) => {
          return data.access === 2
        })
      }
    )

  }
// todos os usuários
  allUsers()
  {
    this.adminService.all().subscribe(
      (data: Users[]) => {
        this.users = data;
        this.paginator = this.users.users.data[1]
        this.users = this.users.users.data[1].data
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
              return data.access === 2
          });
        }
        this.users = this.search.filter((user: Users) => {
          return user.name.toLowerCase().includes(event);
        })
  }
// paginação
  nextPage(event:any)
  {
    this.users = event.users.data[1].data
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
      data:{
        id: `${ element.children[0].innerHTML }`, 
        name:  `${ element.children[1].innerHTML }`,
        register: `${ element.children[2].innerHTML }`,
        function: `${ element.children[3].innerHTML }`,
        department: `${ element.children[4].innerHTML }`,
        email: `${ element.children[5].innerHTML }`,
        access: `${ element.children[6].getAttribute('id')}`
        }})
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

    this.adminService.orderBy(this.order).subscribe(
      (data: any) => {
        this.users = data;
        this.paginator = this.users.users.data[1]
        this.users = this.users.users.data[1].data
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
