import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.css"],
})
export class ShippingDetailsComponent {
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
    ],
    shipping: ["free", Validators.required],
  });

  hasUnitNumber = false;

  countries = [
    { name: "Israel", abbreviation: "IL" },
    { name: "Denmark", abbreviation: "DK" },
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert("Thanks!");
  }
}
