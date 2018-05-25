import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'product',
      loadChildren: './product/product.module#ProductModule',
    },
    {
      path: 'consumer',
      loadChildren: './consumer/consumer.module#ConsumerModule',
    },
    {
      path: 'comment',
      loadChildren: './comment/comment.module#CommentModule',
    },
    {
      path: 'asset',
      loadChildren: './asset/asset.module#AssetModule',
    },
    {
      path: 'likes',
      loadChildren: './likes/likes.module#LikesModule',
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
