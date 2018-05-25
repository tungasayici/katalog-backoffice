import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import 'style-loader!angular2-toaster/toaster.css';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-assetcreate',
  templateUrl: './create.component.html',
  styles: ['./notifications.component.scss'],
})
export class AssetCreateComponent implements OnInit {

  config: ToasterConfig;
  constants: Constants = new Constants();
  editForm: FormGroup;
  frmBuilder: FormBuilder;

  constructor(private http: HttpClient,
    private toasterService: ToasterService,    
    private frmbuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.editForm = this.frmbuilder.group({
      assetType: ['', [Validators.required]],
      fileUrl: ['', [Validators.required]]
    })
  }

  onSubmit() {
    const assetType = this.editForm.controls.assetType.value;
    const fileUrl = this.editForm.controls.fileUrl.value;
    
    // let params = '?';
    // params += 'assetType=' + encodeURIComponent(assetType) + '&';
    // params += 'fileUrl=' + encodeURIComponent(fileUrl);

    let body={
      assetType: encodeURIComponent(assetType),
      fileUrl:  encodeURIComponent(fileUrl)
    };
    
    
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    header = header.append("Content-type", "application/json");
    this.http.post(this.constants.getEnvUrl() + '/assets/createAsset', body,
      { headers: header }).subscribe(d => {
        console.log(d);
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

