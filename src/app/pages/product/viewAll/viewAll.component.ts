import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-productviewAll',
  templateUrl: './viewAll.component.html',
  styles: ['./notifications.component.scss'],
})
export class ProductViewAllComponent {
  config: ToasterConfig;
  constants: Constants = new Constants();
  rows = [];

  constructor(private http: HttpClient, 
    private toasterService: ToasterService) {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + 
    btoa(this.constants.getUserName() + ':' + 
    this.constants.getPassword()));
    this.http.get(this.constants.getEnvUrl()+'/product/all?isActive=false', 
    { headers: header }).subscribe(d => {
      this.rows = d as Array<Object>;
    });
  }

  formatDate(date):String{
    var raw = new Date(date * 1);
    return raw.getDate() + '/' + raw.getMonth() + '/' + raw.getFullYear();
  }
  
  delete(id){
    console.log(id);
    if (window.confirm('Are you sure you want to delete?')) {
      let header = new HttpHeaders();
      header = header.append('Authorization', 'Basic ' + 
      btoa(this.constants.getUserName() + ':' + 
      this.constants.getPassword()));
      this.http.delete(this.constants.getEnvUrl()+'/product/' + id,
      { headers: header }).subscribe(d => {
        window.location.reload();
      });
    }
  }

}
