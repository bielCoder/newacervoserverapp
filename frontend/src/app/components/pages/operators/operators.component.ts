import { Component, OnInit, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from 'src/app/interfaces/users';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../utilities/dialogs/users/edit-dialog/dialog.component';


@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {


  // variables receive data

  users!: any;
  @Output() paginator!:any;
  @Output() alpha:string = "users"
  success!: any;
  search!:any;

  trueOrFalse: boolean = false;
  order: string =  'asc'
  data: Date = new Date();


  
  constructor(private tiService: UsersService, private router: Router, public dialog: MatDialog) { 
    
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
     this.tiService.search().subscribe(
      (data) => {
        this.search = data;
        this.search = this.search.users.data.filter((data: Users) => {
          return data.access === 3
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
        this.paginator = this.users.users.data[2]
        this.users = this.users.users.data[2].data
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
              return data.access === 3
          });
        }
        this.users = this.search.filter((user: Users) => {
          return user.name.toLowerCase().includes(event);
        })
  }
// paginação
  nextPage(event:any)
  {
    this.users = event.users.data[2].data
  }
// página cadastrar
  navigateRegister()
  {
   return this.router.navigate(['create']);
  }

  // abre o modal de atualização de dados
   openDialog(element: HTMLElement)
  {
    this.dialog.open(DialogComponent,{
      width: '600px',
      height:'auto',
      position:{top: '100px'},
      disableClose:true,
      data:{
        id: `${ element.children[0].innerHTML }`, 
        name:  `${ element.children[1].innerHTML }`,
        register: `${ element.children[2].innerHTML }`,
        function: `${ element.children[3].innerHTML }`,
        department: `${ element.children[4].innerHTML }`,
        email: `${ element.children[5].innerHTML }`,
        access: `${ element.children[6].getAttribute('ng-reflect-ng-switch')}`
        }
    })
    console.log(element)
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
          this.paginator = this.users.users.data[2]
          this.users = this.users.users.data[2].data
        },(error) => {
          console.log(error)
        }
      );
    }
}
