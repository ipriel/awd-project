import { Component, OnInit, Input } from "@angular/core";
import { User, Address, Status, Order } from "../../shared/types";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit(): void {
    // TODO: get logged user from auth service?
    this.user = {
      _id: "1231",
      address: ({
        City: "Tel Aviv",
        Country: "Israel",
        addressLine: "Dizingof 15",
        zipCode: 12345,
      } as Partial<Address>) as any,
      firstName: "Johnatan",
      lastName: "Hallel",
      email: "jhallel@gmail.com",
      orders: [
        ({
          date: new Date(),
          items: [{}, {}, {}],
        } as Partial<Order>) as any,
        ({
          date: new Date(),
          items: [{}, {}, {}, {}, {}, {}],
        } as Partial<Order>) as any,
        ({
          date: new Date(),
          items: [{}, {}],
        } as Partial<Order>) as any,
      ],
    } as any;
  }

  public formatAddress(address: Address) {
    return `${address.addressLine}, ${address.City}, ${address.Country},  ${address.zipCode}`;
  }
}
