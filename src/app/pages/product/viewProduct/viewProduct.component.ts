import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-productviewProduct',
  templateUrl: './viewProduct.component.html',
  styles: ['./notifications.component.scss'],
})
export class ViewProductComponent {
  config: ToasterConfig;
  constants: Constants = new Constants();
  // editForm: FormGroup;
  // frmBuilder: FormBuilder;
  id: String;
  rows = [];

  constructor(private http: HttpClient,
    private toasterService: ToasterService,
    // private frmbuilder: FormBuilder,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.id = params["id"]);
  }

  ngOnInit() {
    console.log("girdi");

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    this.http.get(this.constants.getEnvUrl() + '/product/' + this.id, 
    { headers: header }).subscribe(d => {
      this.rows = d as Array<Object>;
      console.log('rows = ', this.rows);
    });
    
  }

}
