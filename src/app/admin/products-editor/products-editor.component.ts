import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Component({
  selector: 'app-products-editor',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.css']
})
export class ProductsEditorComponent implements OnInit {

  private btnDisable: boolean = true;
  private productSelected;
  selectedType: number = 0;
  showProduct: boolean = false;
  showMeta: boolean = false;
  updateProduct: boolean = false;
  currentProduct;

  options : Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  searchProducts(): void {
    this.options = [];
    this.showMeta = false;
    this.showProduct = false;
    this.updateProduct = false;

    if (this.selectedType == 1) // Search shop products
    {
      this.options = [
        { name: "option1", value: 1 },
        { name: "option2", value: 2 }];  
    }
    else if (this.selectedType == 2) // Search meta products
    {
      this.options = [
        { name: "option3", value: 3 },
        { name: "option4", value: 4 }];  
    }
  }

  findProduct(productId): void {
    // search product
    this.currentProduct = {
      name: "Samsung Galaxy",
      type: 'Phone',
      company: "Samsung",
      price: "400",
      description: "this is a phone",
      discount: 0,
      quantity: 5,
      specs: [
        { title: "x", value: 5 },
        { title: "y", value: 6 }],
      showInStore: true
    };

    // if product found
    if (this.selectedType == 1)    
      this.showProduct = true;
    else if (this.selectedType == 2)
      this.showMeta = true;

    // else
  }



  isOptionsEmpty() : boolean {
    if (this.options.length > 0) return false;

    return true;
  }
}
