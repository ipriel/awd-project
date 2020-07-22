import { Component, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userName = "johnatan hallel";

  constructor() { }

  ngOnInit(): void {
  }

}
