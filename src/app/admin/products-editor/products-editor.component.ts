import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import swal from 'sweetalert2';

@Component({
  selector: 'app-products-editor',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.css']
})
export class ProductsEditorComponent implements OnInit {

  private btnDisable: boolean = true;
  private productSelected;
  selectedType: number = 0; // either Shop or Meta
  selectedProduct; // product ID
  currentProduct;
  showProduct: boolean = false;
  showMeta: boolean = false;

  // shop variables
  updatingProduct: boolean = false;

  // meta variables
  creatingProduct: boolean = false;
  oldName: string;
  oldType: string;
  oldCompany: string;
  oldPrice: number;
  oldSpecs: Array<any> = [];
  newDescription: string = "";
  newDiscount: number = 0;
  newQuantity: number = 0;
  newShowInStore: boolean = false;

  options : Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  searchProducts(): void {
    this.options = [];
    this.showMeta = false;
    this.showProduct = false;
    this.updatingProduct = false;

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

    // if product found
    if (this.selectedType == 1)    
    {
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

      this.showProduct = true;
    }
    else if (this.selectedType == 2)
    {
      this.currentProduct = {
        name: "Samsung Galaxy",
        type: "Phone",
        company: "Samsung",
        price: 350,
        specs: [
          { title: "x", value: 5 },
          { title: "y", value: 6 }]
      }

      this.oldName = this.currentProduct.name;
      this.oldType = this.currentProduct.type;
      this.oldCompany = this.currentProduct.company;
      this.oldPrice = this.currentProduct.price;
      this.oldSpecs = this.currentProduct.specs;

      this.showMeta = true;
    }

    // else
  }

  delete()
  {
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover once you delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Deleted!',
          'The product was deleted from the shop database',
          'success'
        )
      }
    });
  }

  updateProduct()
  {
    this.updatingProduct = true;
  }

  cancelUpdate()
  {
    this.updatingProduct = false;
  }

  saveUpdate() 
  {
    this.updatingProduct = false;
  }

  createNewProduct()
  {
    this.creatingProduct = true;
  }

  saveCreate()
  {
    swal.fire({
      title: 'Are you sure?',
      text: 'Your new product will be saved in the shop database.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.creatingProduct = false;

        swal.fire(
          'Saved!',
          'The product was in the shop database',
          'success'
        )
      }
    });
  }

  cancelCreate()
  {
    this.creatingProduct = false;

    this.currentProduct.name = this.oldName;
    this.currentProduct.type = this.oldType;
    this.currentProduct.company = this.oldCompany;
    this.currentProduct.price = this.oldPrice;
    this.currentProduct.specs = this.oldSpecs;
    this.newDiscount = 0;
    this.newDescription = "";
    this.newQuantity = 0;
    this.newShowInStore = false;
  }

  isOptionsEmpty() : boolean {
    if (this.options.length > 0) return false;

    return true;
  }
}
