import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('input') inputElement: ElementRef;
  @Input('type') entityType: string;
  @Input('has-button') hasSearchButton: boolean;
  @Input('mode') mode: "light" | "dark";
  @Output('search') onSearch = new EventEmitter<string>();
  @Output('select') onSelected = new EventEmitter<any>();
  private searchFn: string;
  private sub: Subscription;
  searchControl = new FormControl('');
  results$;

  ngOnInit(): void {
    if (this.entityType == 'product') {
      this.results$ = this.socketService.prodSearchResults$;
      this.searchFn = 'searchProducts';
    }
    else if (this.entityType == 'productMeta'
      || this.entityType == 'product-meta') {
      this.results$ = this.socketService.prodMetaSearchResults$;
      this.searchFn = 'searchProductMetas';
    }
    else if (this.entityType == 'user') {
      this.results$ = this.socketService.userSearchResults$;
      this.searchFn = 'searchUsers';
    }
    else {
      console.error('app-search-bar - Unsupported type.\n' +
        '\'user\', \'product\', \'productMeta\', and \'product-meta\' are supported');
    }

    this.sub = this.searchControl.valueChanges
      .pipe(
        debounceTime(10),
        filter((value: string) => value.length >= 3)
      )
      .subscribe((value)=> {
        if(this.searchFn)
        this.socketService[this.searchFn](value);
      });
  }

  search(term: string) {
    this.onSearch.emit(term);
  }

  selected(option: any) {
    this.onSelected.emit(option);
  }
  
  displayFn(item: {name?: string, firstName: string, lastName: string}): string {
    return item && item.name
    ? item.name 
    : item.firstName
    ? item.firstName+' '+item.lastName
    : '';
  }

  get colorMode() {
    return {
      'input-light': this.mode === "light",
      'input-dark': this.mode === "dark"
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  constructor(private socketService: SocketService) { }

}
