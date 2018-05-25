import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import 'style-loader!angular2-toaster/toaster.css';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-productcreate',
  templateUrl: './create.component.html',
  styles: ['./notifications.component.scss'],
})
export class ProductCreateComponent implements OnInit {

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
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      consumerId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      url: ['', [Validators.required]],
      price: ['', [Validators.required]],
      commentCount: ['', []],
      upVoteCount: ['', []],
      downVoteCount: ['', []],
      active: [false, []],
      // createdTime: ['', []],
      // updatedTime: ['', []],
      isSuitableForDG: ['', [Validators.required]],
      //createdAt: ['', []],
      // updatedAt: ['', []],

      // logCreatedAt: ['', []],
      logId: ['', []],
      investmentNeed: ['', []],
      note: ['', []],
      productId: ['', []],
      scannedDate: ['', []],
      // logUpdatedAt: ['', []],
      value: ['', []],

      assetType: ['', []],
      // assetCreatedAt: ['', []],
      fileUrl: ['', []],
      assetId: ['', []],
      // assetUpdatedAt: ['', []]
    })
  }

  onSubmit() {
    const title = this.editForm.controls.title.value;
    console.log('title = ', title);
    const type = this.editForm.controls.type.value;
    const tags = this.editForm.controls.tags.value;
    const consumerId = this.editForm.controls.consumerId.value;
    const description = this.editForm.controls.description.value;
    const difficulty = this.editForm.controls.difficulty.value;
    const imageUrl = this.editForm.controls.imageUrl.value;
    const url = this.editForm.controls.url.value;
    const isSuitableForDG = this.editForm.controls.isSuitableForDG.value;
    const price = this.editForm.controls.price.value;
    const active = this.editForm.controls.active.value;
    // const createdTime = this.editForm.controls.createdTime.value;
    // const updatedTime = this.editForm.controls.updatedTime.value;
    // const createdAt = this.editForm.controls.createdAt.value;
    // const updatedAt = this.editForm.controls.updatedAt.value;
    const downVoteCount = this.editForm.controls.downVoteCount.value;
    const upVoteCount = this.editForm.controls.upVoteCount.value;
    const commentCount = this.editForm.controls.commentCount.value;

    // const logCreatedAt = this.editForm.controls.logCreatedAt.value;
    const logId = this.editForm.controls.logId.value;
    const investmentNeed = this.editForm.controls.investmentNeed.value;
    const note = this.editForm.controls.note.value;
    const productId = this.editForm.controls.productId.value;
    const scannedDate = this.editForm.controls.scannedDate.value;
    // const logUpdatedAt = this.editForm.controls.logCreatedAt.value;
    const value = this.editForm.controls.value.value;

    const assetType = this.editForm.controls.assetType.value;
    // const assetCreatedAt = this.editForm.controls.logCreatedAt.value;
    const fileUrl = this.editForm.controls.fileUrl.value;
    const assetId = this.editForm.controls.assetId.value;
    // const assetUpdatedAt = this.editForm.controls.logCreatedAt.value;

    let product = {
      active: encodeURIComponent(active),
      commentCount: encodeURIComponent(commentCount),
      consumerId: encodeURIComponent(consumerId),
      // createdAt: encodeURIComponent(createdAt),
      // createdTime: encodeURIComponent(createdTime),
      description: encodeURIComponent(description),
      difficulty: encodeURIComponent(difficulty),
      downVoteCount: encodeURIComponent(downVoteCount),
      imageUrl: encodeURIComponent(imageUrl),
      isSuitableForDG: encodeURIComponent(isSuitableForDG),
      price: parseInt(price),
      tags: encodeURIComponent(tags),
      title: encodeURIComponent(title),
      type: encodeURIComponent(type),
      upVoteCount: encodeURIComponent(upVoteCount),
      // updatedAt: encodeURIComponent(updatedAt),
      // updatedTime: encodeURIComponent(updatedTime),
      url: encodeURIComponent(url)
    };

    let investmentLog = {
      // logCreatedAt: encodeURIComponent(logCreatedAt),
      id: encodeURIComponent(logId),
      investmentNeed: encodeURIComponent(investmentNeed),
      note: encodeURIComponent(note),
      productId: encodeURIComponent(productId),
      scannedDate: encodeURIComponent(scannedDate),
      // logUpdatedAt: encodeURIComponent(logUpdatedAt),
      value: encodeURIComponent(value)
    };

    let assetList = [{
      assetType: encodeURIComponent(assetType),
      // assetCreatedAt: encodeURIComponent(assetCreatedAt),
      fileUrl: encodeURIComponent(fileUrl),
      id: encodeURIComponent(assetId),
      // assetUpdatedAt: encodeURIComponent(assetUpdatedAt)
    }];

    let proporties = [
      assetList,
      investmentLog,
      product
    ]
    console.log('product = ', proporties);

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    header = header.append("Content-type", "application/json");
    this.http.post(this.constants.getEnvUrl() + '/product/createProduct', proporties,
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
