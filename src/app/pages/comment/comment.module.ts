import { NgModule } from "@angular/core";
import { ThemeModule } from "../../@theme/theme.module";
import { ToasterModule } from "angular2-toaster";
import { CommentRoutingModule, routedComponents } from "./comment-routing.module";
import { CKEditorModule } from "ng2-ckeditor";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [ 
      ThemeModule,
      ToasterModule,
      CommentRoutingModule,
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
  export class CommentModule { }