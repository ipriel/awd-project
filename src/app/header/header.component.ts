import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogedIn: boolean = false;
  cap: number =6;

  onLogIn(){
    this.isLogedIn = true;
    
  }
 
  onLogOut(){
   this.isLogedIn = false;
    
  }

  numOfProd(){
    if(this.cap >0)
    return this.cap;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
