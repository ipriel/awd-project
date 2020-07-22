import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User, Roles } from 'src/app/shared/types';
import { AdminService } from 'src/app/admin/admin.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.component.html',
  styleUrls: ['./user-authorization.component.css']
})
export class UserAuthorizationComponent implements OnInit {
  
  @ViewChild('adminBox') adminBox;
  @ViewChild('deliveryBox') deliveryBox;
  @ViewChild('warehouseBox') warehouseBox;

  isUserSelected = false;
  usersList$: Observable<User[]>;
  userRoles$: Observable<Roles>;
  userSelected;

  ngOnInit(): void {
  }

  updateAuthorizations() {
    this.adminService.updateUserRoles(this.userSelected, 
      {admin: this.adminBox._checked, logisticsDelivery: this.deliveryBox._checked, logisticsWarehouse: this.warehouseBox._checked})
      .subscribe((result) => {
        if(result)
        {
          swal.fire({
            icon: 'success',
            title: 'Roles updated successfuly',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
  }

  searchUserRoles(userId) {
    this.isUserSelected = false;
    this.userRoles$ = this.adminService.getUserRoles(userId);
    this.userSelected = userId;
    this.isUserSelected = true;
  }

  constructor(private adminService: AdminService) { }
}
