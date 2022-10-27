import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {

  form = this.fb.group({
    courseType: ["premium", Validators.required],
    price: [null, [
      Validators.required, 
      Validators.min(1), 
      Validators.max(1000),
      Validators.pattern("[0-9]+")
    ]],
    promoStarAt: [null],
    promoEndAt: [null] 
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges
      .subscribe(values => {
        const priceControl = this.form.controls["price"];
        if (values.courseType == "free" && priceControl.enabled) {
          priceControl.disable({ emitEvent: false });
        }
        else if (values.courseType == "premium" && priceControl.disabled) {
          priceControl.enable({ emitEvent: false });
        }
      })
  }

}
