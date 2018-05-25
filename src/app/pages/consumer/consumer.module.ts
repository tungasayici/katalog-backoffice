import { NgModule } from "@angular/core";
import { ThemeModule } from "../../@theme/theme.module";
import { ToasterModule } from "angular2-toaster";
import { ConsumerRoutingModule, routedComponents } from "./consumer-routing.module";
import { CKEditorModule } from "ng2-ckeditor";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [ 
      ThemeModule,
      ToasterModule,
      ConsumerRoutingModule,
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
  export class ConsumerModule { }