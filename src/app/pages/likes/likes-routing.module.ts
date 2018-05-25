import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LikesComponent } from './likes.component';
import { LikesViewComponent } from './view/view.component'
import { LikesEditComponent } from './edit/edit.component';

const routes: Routes = [{
  path: '',
  component: LikesComponent,
  children: [{
    path: 'view',
    component: LikesViewComponent,
  },
  {
    path: 'edit/:id',
    component: LikesEditComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikesRoutingModule { }

export const routedComponents = [
  LikesComponent,
  LikesViewComponent,
  LikesEditComponent
];
