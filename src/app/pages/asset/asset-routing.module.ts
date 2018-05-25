import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetComponent } from './asset.component';
import { AssetViewComponent } from './view/view.component';
import { AssetEditComponent } from './edit/edit.component';
import { AssetCreateComponent } from './create/create.component';


const routes: Routes = [{
  path: '',
  component: AssetComponent,
  children: [{
    path: 'view',
    component: AssetViewComponent,
  },
  {
    path: 'edit/:id',
    component: AssetEditComponent,
  },
  {
    path: 'create',
    component: AssetCreateComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRoutingModule { }

export const routedComponents = [
  AssetComponent,
  AssetViewComponent,
  AssetEditComponent,
  AssetCreateComponent
];
