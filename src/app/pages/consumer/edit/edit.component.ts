import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-consumeredit',
  templateUrl: './edit.component.html',
  styles: ['./notifications.component.scss'],
})
export class ConsumerEditComponent implements OnInit {

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

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    this.http.get(this.constants.getEnvUrl() + '/consumer/' + this.id, { headers: header }).subscribe(d => {
      const consumer = d as Array<Object>;
      this.editForm.controls['userName'].setValue(consumer["userName"]);
      this.editForm.controls['password'].setValue(consumer["password"]);
      this.editForm.controls['fullName'].setValue(consumer["fullName"]);
      this.editForm.controls['email'].setValue(consumer["email"]);
      this.editForm.controls['jobTitle'].setValue(consumer["jobTitle"]);
      this.editForm.controls['bio'].setValue(consumer["bio"]);
      this.editForm.controls['profileUrl'].setValue(consumer["profileUrl"]);
      this.editForm.controls['companyName'].setValue(consumer["companyName"]);
      this.editForm.controls['active'].setValue(consumer["active"]);
    });
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
      // password: encodeURIComponent(password),
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
    this.http.put(this.constants.getEnvUrl() + '/consumer/' + this.id, body,
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
