import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pruductview',
  templateUrl: './view.component.html',
  styles: ['./notifications.component.scss'],
})
export class ConsumerViewComponent {
  config: ToasterConfig;
  constants: Constants = new Constants();
  rows = [];

  constructor(private http: HttpClient, 
    private toasterService: ToasterService) {
      let header = new HttpHeaders();
      header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
      this.http.get(this.constants.getEnvUrl()+'/consumer/all', { headers: header }).subscribe(d => {
        this.rows = d as Array<Object>;
      });   
  }

  delete(id){
    console.log(id);
    if (window.confirm('Are you sure you want to delete?')) {
      let header = new HttpHeaders();
      header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
      this.http.delete(this.constants.getEnvUrl()+'/consumer/' + id,
      { headers: header }).subscribe(d => {
        window.location.reload();
      });
    }
  }
}
