import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  @Output() toggleSideBarForMe2: EventEmitter<any> = new EventEmitter()
  

  constructor() { }

  ngOnInit() {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  toggleSideBar2() {
    this.toggleSideBarForMe2.emit();
  }



}
