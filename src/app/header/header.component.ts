import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;
  cap: number = 6;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.user$ = this.isLoggedIn$.pipe(
      filter((isloggedIn) => isloggedIn),
      switchMap(()=>this.authService.getUser())
    );
  }

  logout() {
    this.authService.logout();
  }

  numOfProd() {
    if (this.cap > 0)
      return this.cap;
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    const element = event.option.value;
    this.router.navigate(['/store/products/product-details/', element._id]);
  }

  onSearch(term: string) {
    console.log(term);
    this.router.navigate(['/store/products'], {
      state: { term }
    });
  }

  constructor(private authService: AuthService, private router: Router) { }

}
