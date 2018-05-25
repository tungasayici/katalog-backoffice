import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductViewComponent } from './view/view.component';
import { ProductCreateComponent } from './create/create.component';
import { ProductViewAllComponent } from './viewAll/viewAll.component';
import { ViewProductComponent } from './viewProduct/viewProduct.component';
import { ProductEditComponent } from './edit/edit.component';


const routes: Routes = [{
  path: '',
  component: ProductComponent,
  children: [{
    path: 'view',
    component: ProductViewComponent,
  },
  {
    path: 'viewAll',
    component: ProductViewAllComponent,
  },
  {
    path: 'viewProduct/:id',
    component: ViewProductComponent,
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
  },
  {
    path: 'create',
    component: ProductCreateComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }

export const routedComponents = [
  ProductComponent,
  ProductViewComponent,
  ProductViewAllComponent,
  ViewProductComponent,
  ProductEditComponent,
  ProductCreateComponent
];
