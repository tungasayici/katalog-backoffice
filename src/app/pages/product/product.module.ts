import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';

import { ToasterModule } from 'angular2-toaster';
import { routedComponents, ProductRoutingModule } from './product-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ 
    ThemeModule,
    ToasterModule,
    ProductRoutingModule,
    CKEditorModule,
    FormsModule,
  ],
  entryComponents: [],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class ProductModule { }
