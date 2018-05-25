import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../helpers/constants';
import { ToasterConfig, ToasterService, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-productedit',
  templateUrl: './edit.component.html',
  styles: ['./notifications.component.scss'],
})
export class ProductEditComponent implements OnInit {
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
    console.log("girdi");
    this.editForm = this.frmbuilder.group({
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      description: ['', [Validators.required]],
      consumerId: ['', [Validators.required]],
      isSuitableForDG: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      url: ['', [Validators.required]],
      price: ['', [Validators.required]],
      commentCount: ['', []],
      upVoteCount: ['', []],
      downVoteCount: ['', []],
      createdTime: ['', []], // editable false olacak ?
      updatedTime: ['', []],  // editable false olacak ?
      active: [false, []],
      likesList: ['', []],
      investmentLogList: ['', []],
      assetList: ['', []]
    })

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    this.http.get(this.constants.getEnvUrl() + '/product/' + this.id, { headers: header }).subscribe(d => {
      const product = d as Array<Object>;
      console.log('title = ',product[0]["product"].title);
      this.editForm.controls['title'].setValue(product[0]["product"].title);
      this.editForm.controls['type'].setValue(product[0]["product"].type);
      this.editForm.controls['tags'].setValue(product[0]["product"].tags);
      this.editForm.controls['difficulty'].setValue(product[0]["product"].difficulty);
      this.editForm.controls['description'].setValue(product[0]["product"].description);
      this.editForm.controls['consumerId'].setValue(product[0]["product"].consumerId);
      this.editForm.controls['isSuitableForDG'].setValue(product[0]["product"].isSuitableForDG);
      this.editForm.controls['imageUrl'].setValue(product[0]["product"].imageUrl);
      this.editForm.controls['url'].setValue(product[0]["product"].url);
      this.editForm.controls['price'].setValue(product[0]["product"].price);
      this.editForm.controls['commentCount'].setValue(product[0]["product"].commentCount);
      this.editForm.controls['upVoteCount'].setValue(product[0]["product"].upVoteCount);
      this.editForm.controls['downVoteCount'].setValue(product[0]["product"].downVoteCount);
      this.editForm.controls['createdTime'].setValue(product[0]["product"].createdTime);
      this.editForm.controls['updatedTime'].setValue(product[0]["product"].upVoteCount);
      this.editForm.controls['active'].setValue(product[0]["product"].active);
      this.editForm.controls['investmentLogList'].setValue(product[0]["investmentLogList"][0].id);
      this.editForm.controls['assetList'].setValue(product[0]["assetList"][0].id);
      // this.editForm.controls['likesList'].setValue(product[0]["likesList"][0].id);
    });
    
  }

  onSubmit() {
    const title = this.editForm.controls.title.value;
    const type = this.editForm.controls.type.value;
    const tags = this.editForm.controls.tags.value;
    const difficulty = this.editForm.controls.difficulty.value;
    const description = this.editForm.controls.description.value;
    const consumerId = this.editForm.controls.consumerId.value;
    const isSuitableForDG = this.editForm.controls.isSuitableForDG.value;
    const imageUrl = this.editForm.controls.imageUrl.value;
    const url = this.editForm.controls.url.value;
    const price = this.editForm.controls.price.value;
    const commentCount = this.editForm.controls.commentCount.value;
    const upVoteCount = this.editForm.controls.upVoteCount.value;
    const downVoteCount = this.editForm.controls.downVoteCount.value;
    const createdTime = this.editForm.controls.createdTime.value;
    const active = this.editForm.controls.active.value;
    const investmentLogList = this.editForm.controls.investmentLogList.value;
    // const likesList = this.editForm.controls.likesList.value;
    const assetList = this.editForm.controls.assetList.value;
    
    let body = {
      title: encodeURIComponent(title),
      type: encodeURIComponent(type),
      tags: encodeURIComponent(tags),
      difficulty: encodeURIComponent(difficulty),
      description: encodeURIComponent(description),
      consumerId: encodeURIComponent(consumerId),
      isSuitableForDG: encodeURIComponent(isSuitableForDG),
      imageUrl: encodeURIComponent(imageUrl),
      url: encodeURIComponent(url),
      price: encodeURIComponent(price),
      active: encodeURIComponent(active),
      investmentLogList: encodeURIComponent(investmentLogList),
      // likesList: encodeURIComponent(likesList),
      assetList: encodeURIComponent(assetList),
    };
    console.log('body = ',body);

    let header = new HttpHeaders();
    header = header.append('Authorization', 'Basic ' + btoa(this.constants.getUserName() + ':' + this.constants.getPassword()));
    header = header.append("Content-type", "application/json");
    this.http.put(this.constants.getEnvUrl() + '/product/' + this.id, body,
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
