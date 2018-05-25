import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import 'style-loader!angular2-toaster/toaster.css';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-consumercreate',
  templateUrl: './create.component.html',
  styles: ['./notifications.component.scss'],
})
export class ConsumerCreateComponent implements OnInit {
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
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      profileUrl: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      active: [false, []]
    })
  }

  onSubmit() {
    const userName = this.editForm.controls.userName.value;
    const password = this.editForm.controls.password.value;
    const fullName = this.editForm.controls.fullName.value;
    const email = this.editForm.controls.email.value;
    const jobTitle = this.editForm.controls.jobTitle.value;
    const bio = this.editForm.controls.bio.value;
    const profileUrl = this.editForm.controls.profileUrl.value;
    const companyName = this.editForm.controls.companyName.value;
    const active = this.editForm.controls.active.value;

    // let params = '?';
    // params += 'userName=' + encodeURIComponent(userName) + '&';
    // params += 'password=' + encodeURIComponent(password) + '&';
    // params += 'fullName=' + encodeURIComponent(fullName) + '&';
    // params += 'email=' + encodeURIComponent(email) + '&';
    // params += 'jobTitle=' + encodeURIComponent(jobTitle) + '&';
    // params += 'bio=' + encodeURIComponent(bio) + '&';
    // params += 'profileUrl=' + encodeURIComponent(profileUrl) + '&';
    // params += 'companyName=' + encodeURIComponent(companyName) + '&';
    // params += 'active=' + encodeURIComponent(active);

    let body = {
      userName: encodeURIComponent(userName),
      password: encodeURIComponent(password),
      fullName: encodeURIComponent(fullName),
      email: encodeURIComponent(email),
      jobTitle: encodeURIComponent(jobTitle),
      bio: encodeURIComponent(bio),
      profileUrl: encodeURIComponent(profileUrl),
      companyName: encodeURIComponent(companyName),
      active: encodeURIComponent(active),
    };

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));    
    header = header.append("Content-type", "application/json");
    this.http.post(this.constants.getEnvUrl() + '/consumer/register', body,
      { headers: header }).subscribe(d => {
        if ((d as Array<Object>)["errorCode"] === 200) {
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
