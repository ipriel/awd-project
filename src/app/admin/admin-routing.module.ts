import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsEditorComponent } from './products-editor/products-editor.component';
import { UserAuthorizationComponent } from './user-authorization/user-authorization.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: ProductsEditorComponent
  },
  {
    path: 'users-authorization',
    component: UserAuthorizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
