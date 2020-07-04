import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit {

  cartProducts:Product[]=[{productId: 88,
    productName: 'samsung some',
    productPrice: 88,
    productDescription: 'some',
    productDiscount: 88,
    productQuantity: 88,
    productCategory: 'phone',
    productSeller: 'sam',
    productImage:'https://d3m9l0v76dty0.cloudfront.net/system/photos/3712313/large/24b5d2d1e40056808b90b20416697270.jpg'},{productId: 88,
    productName: 'samsung some',
    productPrice: 88,
    productDescription: 'some',
    productDiscount: 88,
    productQuantity: 88,
    productCategory: 'phone',
    productSeller: 'sam',
    productImage:'https://d3m9l0v76dty0.cloudfront.net/system/photos/3712313/large/24b5d2d1e40056808b90b20416697270.jpg'},{productId: 88,
    productName: 'samsung some',
    productPrice: 88,
    productDescription: 'some',
    productDiscount: 88,
    productQuantity: 88,
    productCategory: 'phone',
    productSeller: 'sam',
    productImage:'https://d3m9l0v76dty0.cloudfront.net/system/photos/3712313/large/24b5d2d1e40056808b90b20416697270.jpg'},{productId: 88,
    productName: 'samsung some',
    productPrice: 88,
    productDescription: 'some long ass description  best and things as such',
    productDiscount: 88,
    productQuantity: 88,
    productCategory: 'phone',
    productSeller: 'sam',
    productImage:'https://d3m9l0v76dty0.cloudfront.net/system/photos/3712313/large/24b5d2d1e40056808b90b20416697270.jpg'},{productId: 88,
    productName: 'samsung some',
    productPrice: 88,
    productDescription: 'some long ass description  best and things as such',
    productDiscount: 88,
    productQuantity: 88,
    productCategory: 'phone',
    productSeller: 'sam',
    productImage:'https://d3m9l0v76dty0.cloudfront.net/system/photos/3712313/large/24b5d2d1e40056808b90b20416697270.jpg'},{productId: 88,
    productName: 'samsung some',
    productPrice: 88,
    productDescription: 'some long ass description  best and things as such',
    productDiscount: 88,
    productQuantity: 88,
    productCategory: 'phone',
    productSeller: 'sam',
    productImage:'https://d3m9l0v76dty0.cloudfront.net/system/photos/3712313/large/24b5d2d1e40056808b90b20416697270.jpg'},{productId: 88,
    productName: 'samsung some',
    productPrice: 88,
    productDescription: 'some long ass description  best and things as such',
    productDiscount: 88,
    productQuantity: 88,
    productCategory: 'phone',
    productSeller: 'sam',
    productImage:'https://d3m9l0v76dty0.cloudfront.net/system/photos/3712313/large/24b5d2d1e40056808b90b20416697270.jpg'}]

  constructor() { }

  ngOnInit(): void {
  }

  removeCartProd(product){
    console.log("remove prod");
  }

}
