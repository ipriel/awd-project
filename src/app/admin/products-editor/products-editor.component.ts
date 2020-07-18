import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subscriber, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AdminService } from 'src/app/admin/admin.service';
import { ImageData, ObjectId, Product, SelectOption } from 'src/app/shared/types';
import swal from 'sweetalert2';

enum ObjectType {
  NONE,
  SHOP,
  META
}

@Component({
  selector: 'app-products-editor',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.css']
})
export class ProductsEditorComponent implements OnInit {

  productForm: FormGroup;
  typeSelect = new FormControl(0);
  productSelect = new FormControl('');
  products$: Observable<SelectOption[]>;
  currentProduct$: Observable<Product>;
  formReady$: Observable<any>;

  resetSignal = new BehaviorSubject(false);
  showProduct = false;
  showMeta = false;

  // shop variables
  updatingProduct: boolean = false;

  // meta variables
  creatingProduct: boolean = false;

  ngOnInit() {
    this.products$ = this.typeSelect.valueChanges.pipe(
      tap(() => {
        this.showMeta = false;
        this.showProduct = false;
        this.updatingProduct = false;
      }),
      switchMap((type: ObjectType) => this.switchHttp(
        this.adminService.getProducts(),
        this.adminService.getMetaProducts(),
        type
      ))
    );

    this.currentProduct$ = combineLatest([
      this.typeSelect.valueChanges,
      this.productSelect.valueChanges,
    ]).pipe(
      switchMap(([type, id]: [ObjectType, ObjectId]) => combineLatest(
        this.switchHttp(
          this.adminService.getProductById(id),
          this.adminService.getMetaProductById(id),
          type
        ),
        this.resetSignal.asObservable()
      )),
      map(([val, _]) => val),
      map((product: Partial<Product> & { importerPrice?: number }) => {
        if (this.typeSelect.value == ObjectType.META) {
          product.discount = 0;
          product.description = '';
          product.showInStore = false;
          product.price = product.importerPrice || 0;
        }

        return product as Product;
      }),
      tap((product: Product) => {
        this.productForm = this.buildForm(product);
      }),
      tap(() => {
        if (this.typeSelect.value == ObjectType.SHOP)
          this.showProduct = true;
        else if (this.typeSelect.value == ObjectType.META)
          this.showMeta = true;
      })
    );
  }

  private switchHttp<L, R>(shop: Observable<L>, meta: Observable<R>, currentType: ObjectType): Observable<L | R> {
    const hooks = (subscriber: Subscriber<L | R>) => ({
      next: (value) => subscriber.next(value),
      error: (error) => subscriber.error(error),
      complete: () => subscriber.complete()
    });

    return new Observable(subscriber => {
      const subSink = new Subscription();

      if (this.typeSelect.value == ObjectType.SHOP)
        subSink.add(shop.subscribe(hooks(subscriber)));
      else if (this.typeSelect.value == ObjectType.META)
        subSink.add(meta.subscribe(hooks(subscriber)));

      return () => subSink.unsubscribe();
    });
  }

  private buildForm(data: {}) {
    const entries = Object.entries(data);
    const group = new FormGroup({});
    
    for (let [key, val] of entries) {
      let control;
      console.log({
        key,
        val,
        type: typeof val,
        array: this.isArray(val)
      });

      if (this.isArray(val)) {
        const controlArr = (val as Array<any>).map(elem => new FormControl(elem));
        control = new FormArray(controlArr);
        console.log({key, control});
      }
      else if (this.isObject(val)) {
        console.log({ key, val });
        control = this.buildForm(val);
      }
      else {
        control = new FormControl(val);
      }
      group.addControl(key, control);
    }
    
    return group;
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }

  isString(obj: any) {
    return typeof obj == 'string';
  }

  isNumber(obj: any) {
    return typeof obj == 'number';
  }

  isObject(obj: any) {
    return typeof obj == 'object'
      && !this.isArray(obj)
      && !(obj as ImageData).contentType;
  }

  getFormArray(formArrayName: string): FormArray {
    return this.productForm.get(formArrayName) as FormArray;
  }

  delete(product: Product) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover once you delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.value)
        return this.adminService.deleteProduct(product._id);
    }).then(() => {
      swal.fire(
        'Deleted!',
        'The product was deleted from the shop database',
        'success');
    });
  }

  updateProduct() {
    this.updatingProduct = true;
  }

  cancelUpdate() {
    this.updatingProduct = false;

    this.resetForm();
  }

  saveUpdate(product: Product) {
    // save product updates
    swal.fire({
      title: 'Update product?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.adminService.updateProduct(product);
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

    this.resetForm();
  }

  createNewProduct() {
    this.creatingProduct = true;
  }

  saveCreate(product: Product) {
    swal.fire({
      title: 'Are you sure?',
      text: 'Your new product will be saved in the shop database.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      preConfirm: () => { return this.adminService.saveNewProduct(product) }
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

  cancelCreate() {
    this.creatingProduct = false;
    this.resetForm();
  }

  resetForm() {
    this.resetSignal.next(true);
  }

  constructor(private adminService: AdminService) { }
}
