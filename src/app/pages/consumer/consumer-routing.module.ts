import { Routes, RouterModule } from "@angular/router";
import { ConsumerViewComponent } from "./view/view.component";
import { ConsumerEditComponent } from "./edit/edit.component";
import { ConsumerCreateComponent } from "./create/create.component";
import { NgModule } from "@angular/core";
import { ConsumerComponent } from "./consumer.component";

const routes: Routes = [{
  path: '',
  component: ConsumerComponent,
  children: [{
    path: 'view',
    component: ConsumerViewComponent,
  },
  {
    path: 'edit/:id',
    component: ConsumerEditComponent,
  },
  {
    path: 'create',
    component: ConsumerCreateComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerRoutingModule { }

export const routedComponents = [
  ConsumerComponent,
  ConsumerViewComponent,
  ConsumerEditComponent,
  ConsumerCreateComponent
];
