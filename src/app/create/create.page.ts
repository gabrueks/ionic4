import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // createStudent(): FormGroup {
  //   return this.formBuilder.group({
  //     student_name: ''
  //   });
  // }

  // addBlankStudent(): void {
  //   this.students = this.classroomForm.get('students') as FormArray;
  //   this.students.push(this.createStudent());
  // }

  // deleteStudent(control, index) {
  //   control.removeAt(index);
  // }

  // async saveClassroom() {
  //   await this.api
  //     .postClassroom(this.classroomForm.value)
  //     .subscribe(res => {
  //       const id = res['id'];
  //       this.router.navigate(['/detail/' + id]);
  //     }, err => {
  //       console.log(err);
  //     });
  // }
}
