import {PipeTransform, Pipe} from '@angular/core';
import {studentModal} from 'src/app/modals/studentModal';

@Pipe({
    name:'search'
})
export class filterPipe implements  PipeTransform{
    transform(students: studentModal[], search:string): studentModal[] {
        if(!students || !search){
            return students;
        }
        return students.filter(student=>student.fname.toLowerCase().indexOf(search.toLowerCase())!==-1 || student.lname.toLowerCase().indexOf(search.toLowerCase())!==-1);
    }
    
}
