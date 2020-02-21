import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  sideBarOpen2 = true;

  constructor() { }

  ngOnInit() {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen ;
  }

  sideBarToggler2() {
    this.sideBarOpen2 = !this.sideBarOpen2 ;
  }



}
