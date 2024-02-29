import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Historics } from 'src/app/interfaces/historics';
import { HistoricsService } from 'src/app/services/historics.service';


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
  
  @Output() paginator!:any;
  @Output() alpha:string = "users"

  constructor(private historicsService: HistoricsService, private router: Router){}

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
            this.historics = this.historics.historics.data.data
          }
        );


        // search

        this.historicsService.search().subscribe(
          (data) => {
            this.search = data;
            this.search = this.search.historics.data
          }
        )


        
  }

  // campo busca
  onSearch(event:any)
  {     
      this.historics = this.search.filter((data: Historics) => {
      return data.name.toLowerCase().includes(event) || data.register.toLowerCase().includes(event) || data.product.toLowerCase().includes(event) || data.code.toLowerCase().includes(event) ||  data.brand.toLowerCase().includes(event) && data.pending == false;
      })
  }


  // paginação
  nextPage(event:any)
  {
    console.log(event);
    this.historics = event.historics.data.data
  }


 

}
