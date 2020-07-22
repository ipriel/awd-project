import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from "../../product.service";
import { Product } from '../../product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  isLinear = true;
  firstFormGroup:FormGroup;
  products$: Observable<Product[]>;
  
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService
      .getProducts()
  }

}
