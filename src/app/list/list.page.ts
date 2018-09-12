import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  classrooms: any;

  constructor(public api: RestApiService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getClassroom();
  }

  async getClassroom() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      spinner: 'crescent'
    });
    await loading.present();
    await this.api
      .getClassroom()
      .subscribe(res => {
        console.log(res);
        this.classrooms = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
