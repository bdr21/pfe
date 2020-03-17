import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/httpclient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private httpClientService : HttpClientService) { }
  public nOS = "" ;
  ngOnInit() {
    this.getNOS() ;
  }

  getNOS() {
    this.httpClientService.getNOS().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }
  handleSuccessfulResponse(response) {
    localStorage.setItem('nos',response) ;
    this.nOS = localStorage.getItem('nos') ;
    console.log(this.nOS);
  }
}
