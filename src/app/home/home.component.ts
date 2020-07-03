import { Component, OnInit } from '@angular/core';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   slides = [{'image':'https://live.staticflickr.com/2890/12284663095_3bec4b504e_b.jpg'},
  {'image':'https://p0.pikist.com/photos/419/870/iphone-apple-phone-cellular-phone-cell-electronics-smartphone-call-to-write.jpg'},
  {'image':'https://p0.pxfuel.com/preview/355/420/28/robot-vacuum-cleaner-robot-machine-home-appliance.jpg'}];

  constructor() { }

  ngOnInit(): void {
  }

}
