import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CoursesService } from '../services/courses.service';

export function courseTitleValidator(courses: CoursesService): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return courses.findAllCourses()
            .pipe(
                map(courses => {
                    const course = courses.find(
                        course => course.description.toLocaleLowerCase() == control.value.toLowerCase());
                    return course ? { titleExists: true } : null;
                })
            )
    }
}