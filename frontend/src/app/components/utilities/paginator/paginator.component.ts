import { Component, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorService } from '../../../services/paginator.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginator:any;
  @Output() paginatorEvent: EventEmitter<any> = new EventEmitter(); 
  @Input() alpha!: string;
  


  constructor(private paginatorService: PaginatorService) {
   
  }

  ngOnInit(): void {
   
  }

  handlePagination(page: PageEvent)
  {
    page.pageIndex += this.paginator.current_page;
    page.previousPageIndex = page.pageIndex - 1;
   
    this.paginatorService.handlePage(page.pageIndex,page.pageSize,this.alpha).subscribe(
      (data) => {
        return this.paginatorEvent.emit(data);
      }
    )
  }

}
