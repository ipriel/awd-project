import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { ShopService } from "./shop.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  addresses$: Subscription;

  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;

  map: google.maps.Map;

  lat = 32.09;
  lng = 34.96;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  constructor(private shopService: ShopService) {}
  ngOnDestroy(): void {
    this.addresses$.unsubscribe();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.mapInitializer();

    this.addresses$ = this.shopService
      .getAddresses()
      .subscribe(({ shopAddresses }) => {
        for (const address of shopAddresses) {
          new google.maps.Marker({
            position: {
              lat: address.latitude,
              lng: address.longitude,
            },
            map: this.map,
          });
        }
      });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
  }
}
