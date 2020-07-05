import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-cart-calc',
  templateUrl: './cart-calc.component.html',
  styleUrls: ['./cart-calc.component.css']
})
export class CartCalcComponent implements OnInit {

  @Input() products: Product[];

  totalValue:number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.products;

    const products: Product[] = dataChanges.currentValue;
    this.totalValue = 0;
    products.forEach((product) => {
      this.totalValue += product.productPrice;
    });
  }

  ngOnInit(): void {
  }

}
