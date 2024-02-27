import { Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrl: './historic.component.css'
})
export class HistoricComponent implements OnInit {

  data: Date = new Date();
  success!: any;
  
  @Output() paginator!:any;
  @Output() alpha:string = "users"

  ngOnInit(): void {
        // timer messageria
        this.success = window.localStorage.getItem('message')
        setInterval(() => {
          window.localStorage.removeItem('message');
        },5000)
  }

  // campo busca
  onSearch(event:any)
  {     
    console.log(event);
        // if(event === '')
        // {
        //   this.users = this.paginator.data.filter((data: Users) => {
        //       return data.access === 3
        //   });
        // }
        // this.users = this.search.filter((user: Users) => {
        //   return user.name.toLowerCase().includes(event);
        // })
  }


  // paginação
  nextPage(event:any)
  {
    console.log(event)
  }
}
