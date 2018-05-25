import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import 'style-loader!angular2-toaster/toaster.css';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-likesedit',
  templateUrl: './edit.component.html',
  styles: ['./notifications.component.scss'],
})
export class LikesEditComponent implements OnInit {
  config: ToasterConfig;
  constants: Constants = new Constants();
  editForm: FormGroup;
  frmBuilder: FormBuilder;
  id: String;

  constructor(private http: HttpClient,
    private toasterService: ToasterService,
    private frmbuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.id = params["id"]);
  }

  ngOnInit() {
    this.editForm = this.frmbuilder.group({
      consumer: ['', [Validators.required]],
      product: ['', [Validators.required]],
      upVote: ['', []],
      createdTime: ['', []],
      updatedTime: ['', []]
    })

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    this.http.get(this.constants.getEnvUrl() + '/likes/' + this.id, { headers: header }).subscribe(d => {
      const like = d as Array<Object>;
      this.editForm.controls['consumer'].setValue(like["consumer"].userName);
      this.editForm.controls['product'].setValue(like["product"].title);
      this.editForm.controls['upVote'].setValue(like["upVote"]);
      this.editForm.controls['createdTime'].setValue(like["createdTime"]);
      this.editForm.controls['updatedTime'].setValue(like["updatedTime"]);
    });

  }

  onSubmit() {
    const consumer = this.editForm.controls.consumer.value;
    const product = this.editForm.controls.product.value;
    const upVote = this.editForm.controls.upVote.value;
    const createdTime = this.editForm.controls.createdTime.value;
    const updatedTime = this.editForm.controls.updatedTime.value;

    // let params = '?';
    // params += 'consumer=' + encodeURIComponent(consumer) + '&';
    // params += 'product=' + encodeURIComponent(product) + '&';
    // params += 'upVote=' + encodeURIComponent(upVote) + '&';
    // params += 'createdTime=' + encodeURIComponent(createdTime) + '&';
    // params += 'updatedTime=' + encodeURIComponent(updatedTime);

    let body = {
      consumer: encodeURIComponent(consumer),
      product: encodeURIComponent(product),
      upVote: encodeURIComponent(upVote),
      createdTime: encodeURIComponent(createdTime),
      updatedTime: encodeURIComponent(updatedTime),
    };

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    header = header.append("Content-type", "application/json");
    this.http.put(this.constants.getEnvUrl() + '/likes/' + this.id, body,
      { headers: header }).subscribe(d => {
        if ((d as Array<Object>)["errorCode"] === 201) {
          this.showToast("success", "Başarılı", "Başarıyla eklendi");
        } else if ((d as Array<Object>)["errorCode"] === 404 || (d as Array<Object>)["status"] === 500) {
          this.showToast("error", "Hata", "İşlem yapılamadı");
        }
      });
  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: "toast-top-right",
      timeout: 3000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: "default",
      limit: 5,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 3000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}

