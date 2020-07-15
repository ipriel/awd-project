import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import swal from 'sweetalert2';
import { AdminService } from 'src/app/admin.service';
import { SelectControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-products-editor',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.css']
})
export class ProductsEditorComponent implements OnInit {

  products: [];
  selectedType: number = 0; // either Shop or Meta
  selectedProduct; // product ID
  currentProduct;
  tmpProduct;
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

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  searchProducts(): void {
    this.options = [];
    this.showMeta = false;
    this.showProduct = false;
    this.updatingProduct = false;
    this.selectedType = 0;

    if (this.selectedType == 1) // Search shop products
    {
      this.products = this.adminService.getShopProducts();
    }
    else if (this.selectedType == 2) // Search meta products
    {
      this.products = this.adminService.getMetaProducts();
    }
  }

  findProduct(): void {
    // search product
    this.currentProduct = this.adminService.findProductById(this.selectedProduct);

    this.resetTmp();

    // if product found
    if (this.selectedType == 1)    
    {
      this.showProduct = true;
    }
    else if (this.selectedType == 2)
    {
      // initialize tmpProduct
      this.tmpProduct.discount = 0;
      this.tmpProduct.quantity = 0;
      this.tmpProduct.description = "";
      this.tmpProduct.showInStore = false;

      this.showMeta = true;
    }
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

        this.adminService.deleteProduct(this.selectedProduct).then((result) =>{
          swal.fire(
            'Deleted!',
            'The product was deleted from the shop database',
            'success');
        });
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

    this.resetTmp();
  }

  saveUpdate() 
  {
    // save product updates
    swal.fire({
      title: 'Update product?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,      
      preConfirm: () => {
        return this.adminService.updateProduct(this.tmpProduct);
      }          
    }).then((result) => {
        if (result.value) {
          swal.fire(
            'Product updated!',
            'The product is up to date in the shop database',
            'success'
          );

        this.updatingProduct = false;
      }
    });

    // find product again to reset values
    this.findProduct();
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
      cancelButtonText: 'No',
      preConfirm: () => { return this.adminService.saveNewProduct(this.tmpProduct)}
    }).then((result) => {
      // if user confirmed
      if (result.value) {
        swal.fire(
          'Saved!',
          'The product was in the shop database',
          'success'
        );
        this.creatingProduct = false;
      }
    });
  }

  cancelCreate()
  {
    this.creatingProduct = false;
    
    this.resetTmp();
    this.tmpProduct.discount = 0;
    this.tmpProduct.quantity = 0;
    this.tmpProduct.description = "";
    this.tmpProduct.showInStore = false;
  }

  resetTmp()
  {
    this.tmpProduct = {...this.currentProduct};
    this.tmpProduct.specs = [];
    this.currentProduct.specs.forEach(spec => {
      this.tmpProduct.specs.push({title: spec.title, value: spec.value});
    });
  }

  isOptionsEmpty() : boolean {
    if (this.options.length > 0) return false;

    return true;
  }
}
