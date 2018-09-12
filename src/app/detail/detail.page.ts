import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LoadingController } from '@ionic/angular';

import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  classroom: any = {};

  constructor(
    public api: RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public _location: Location
  ) { }

  ngOnInit() {
    this.getClassroom();
  }

  async getClassroom() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      spinner: 'crescent'
    });
    await loading.present();
    await this.api.getClassroomById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.classroom = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  async deleteClassroom(id: any) {
    // spinner: 'hide',
    // content: `<img src="assets/img/gif.gif" />`,
    const loading = await this.loadingController.create({
      message: 'Loading',
      spinner: 'crescent'
    });
    await loading.present();
    await this.api.deleteClassroom(id)
      .subscribe(res => {
        loading.dismiss();
        this._location.back();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
