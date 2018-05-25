import { Routes, RouterModule } from "@angular/router";
import { CommentViewComponent } from "./view/view.component";
import { CommentEditComponent } from "./edit/edit.component";
import { NgModule } from "@angular/core";
import { CommentComponent } from "./comment.component";

const routes: Routes = [{
  path: '',
  component: CommentComponent,
  children: [{
    path: 'view',
    component: CommentViewComponent,
  },
  {
    path: 'edit/:id',
    component: CommentEditComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule { }

export const routedComponents = [
  CommentComponent,
  CommentViewComponent,
  CommentEditComponent
];
