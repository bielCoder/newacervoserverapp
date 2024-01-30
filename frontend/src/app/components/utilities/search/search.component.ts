import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Users } from 'src/app/interfaces/users';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() data: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
   
  }

  onSearch(e: Event)
  {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    this.data.emit(value);
  }

}
