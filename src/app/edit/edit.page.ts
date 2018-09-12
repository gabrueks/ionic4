import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { LoadingController } from '@ionic/angular';

import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  classroomForm: FormGroup;
  students: FormArray;

  constructor(
    public api: RestApiService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
  ) {
      this.getClassroom(this.route.snapshot.paramMap.get('id'));
      this.classroomForm = this.formBuilder.group({
        'class_name': [null, Validators.required],
        'students': this.formBuilder.array([])
      });
    }

  ngOnInit() {
  }

  async getClassroom(id) {
    const loading = await this.loadingController.create({
      message: 'Loading',
      spinner: 'crescent'
    });
    loading.present();
    await this.api.getClassroomById(id)
      .subscribe((res: any) => {
        this.classroomForm.controls['class_name'].setValue(res.class_name);
        // tslint:disable-next-line:prefer-const
        let controlArray = <FormArray>this.classroomForm.controls['students'];
        res.students.forEach(std => {
          controlArray.push(
            this.formBuilder.group({
            student_name: ''
          })
        );
        });
        for (let i = 0; i < res.students.length; i++) {
          controlArray.controls[i].get('student_name').setValue(res.students[i].student_name);
        }
        console.log(this.classroomForm);
        this.loadingController.dismiss();
      });
  }

  async updateClassroom() {
    await this.api
      .updateClassroom(this.route.snapshot.paramMap.get('id'), this.classroomForm.value)
      .subscribe(res => {
        const id = res['id'];
        this.router.navigate(['/detail', JSON.stringify(id)]);
      }, err => {
        console.log(err);
      });
  }
}
