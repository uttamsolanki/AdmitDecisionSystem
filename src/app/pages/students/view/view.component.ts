import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MainService } from '../../../services/main.service';
import { studentModal } from '../../../modals/studentModal';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewStudentComponent implements OnInit {
  studentId="";
  studentData:studentModal[];
  constructor(private route: ActivatedRoute,
		private mainService : MainService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentId = params['id'];

      this.mainService.listStudentId(this.studentId).subscribe((res:any)=>{
        console.log(res);
        if(res.status == 1){
          this.studentData = res.data;
          console.log(this.studentData);
        }
        else{
          console.log("Errrorrorororror!");
        }
      });
    });
  }

  deleteStudent(id:string){
    console.log("Delete student",id);
    // this.mainService.deleteStudent(id).subscribe((res:any)=>{
    // });
    this.mainService.deleteStudent(id).subscribe((response:any)=>{  
            console.log(response.status);
            if(response.status == 1){
              console.log("Data deleted successfully");
              
            this.router.navigateByUrl('/students');
              //this.addStudentForm.reset();
              //let data = response.data;
              //console.log(data);
            }
            else{
              console.log("Something Went Wrong!");
            }
          },(err)=>{
            console.log(err);
          });
  }
}
