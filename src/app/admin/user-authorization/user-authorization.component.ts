import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AdminService } from 'src/app/admin/admin.service';
import { User } from 'src/app/shared/types';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.component.html',
  styleUrls: ['./user-authorization.component.css']
})
export class UserAuthorizationComponent implements OnInit, OnDestroy {

  isUserSelected = false;
  usersList$: Observable<User[]>;
  userSelected = new Subject<string>();
  selectedUser: string;
  sub: Subscription;

  roleForm = new FormGroup({
    admin: new FormControl(false),
    logisticsDelivery: new FormControl(false),
    logisticsWarehouse: new FormControl(false)
  });

  ngOnInit(): void {
    this.sub = this.userSelected.asObservable()
      .pipe(
        tap((userId) => {
          this.isUserSelected = false;
          this.selectedUser = userId;
        }),
        switchMap((userId) => this.adminService.getUserRoles(userId)),
        tap(() => this.isUserSelected = true)
      )
      .subscribe((res) => {
        this.roleForm.patchValue({
          admin: res['admin'] || false,
          logisticsDelivery: res['logistics-delivery'] || false,
          logisticsWarehouse: res['logistics-warehouse'] || false
        })
      });
  }

  updateAuthorizations() {
    const roles = this.roleForm.value;

    this.adminService.updateUserRoles(this.selectedUser, {
      'admin': roles.admin,
      'logistics-delivery': roles.logisticsDelivery,
      'logistics-warehouse': roles.logisticsWarehouse
    }).subscribe((result) => {
      if (result) {
        swal.fire({
          icon: 'success',
          title: 'Roles updated successfuly',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    const user = event.option.value as User;
    this.userSelected.next(user.userId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  constructor(private adminService: AdminService) { }
}
