import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import 'style-loader!angular2-toaster/toaster.css';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-commentedit',
  templateUrl: './edit.component.html',
  styles: ['./notifications.component.scss'],
})
export class CommentEditComponent implements OnInit {
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
      productId: ['', [Validators.required]],
      consumerId: ['', [Validators.required]],
      cons: ['', [Validators.required]],
      content: ['', [Validators.required]],
      pros: ['', [Validators.required]],
      createdAt: ['', []],
      updatedAt: ['', []],
      active: [false, []]
    }) 

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    this.http.get(this.constants.getEnvUrl() + '/commentReview/' + this.id, { headers: header }).subscribe(d => {
      const comment = d as Array<Object>;
      this.editForm.controls['productId'].setValue(comment["productId"]);           
      this.editForm.controls['consumerId'].setValue(comment["consumerId"]);
      this.editForm.controls['cons'].setValue(comment["cons"]);
      this.editForm.controls['content'].setValue(comment["content"]);
      this.editForm.controls['pros'].setValue(comment["pros"]);
      this.editForm.controls['createdAt'].setValue(comment["createdAt"]);
      this.editForm.controls['updatedAt'].setValue(comment["updatedAt"]);
      this.editForm.controls['active'].setValue(comment["active"]);
    });
  }

  onSubmit() {
    const productId = this.editForm.controls.productId.value;
    const consumerId = this.editForm.controls.consumerId.value;
    const cons = this.editForm.controls.cons.value;
    const content = this.editForm.controls.content.value;
    const pros = this.editForm.controls.pros.value;
    const createdAt = this.editForm.controls.createdAt.value;
    console.log('createdTime = ',createdAt);
    const updatedAt = this.editForm.controls.updatedAt.value;
    const active = this.editForm.controls.active.value;

    let body = {
      productId: encodeURIComponent(productId),
      consumerId: encodeURIComponent(consumerId),
      cons: encodeURIComponent(cons),
      content: encodeURIComponent(content),
      pros: encodeURIComponent(pros),
      createdAt: encodeURIComponent(createdAt),
      updatedAt: encodeURIComponent(updatedAt),
      active: encodeURIComponent(active),
    };

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    header = header.append("Content-type", "application/json");
    this.http.put(this.constants.getEnvUrl() + '/commentReview/' + this.id, body,
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
