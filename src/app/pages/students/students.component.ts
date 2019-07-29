import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MainService } from '../../services/main.service';

import { studentModal } from '../../modals/studentModal';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  
  studentList : studentModal[];
  searchTerm:string;
  constructor(private mainService : MainService,
    private router: Router) { }

  ngOnInit() {
    this.mainService.listStudent().subscribe((res:any)=>{
      console.log(res);
      if(res.status == 1){
        this.studentList = res.data;
        
      }
    });
  }

  // viewStudent(id:string){
	// 	let studentId: NavigationExtras = {
	// 		queryParams: {
	// 			special: JSON.stringify(id)
	// 		}
  //   };
  //   this.router.navigateByUrl('/students/view', studentId);
  // }

  addStudent(){
    this.router.navigateByUrl('/students/addupdate');
  }

  // updateStudent(id:string){
  //   let studentId: NavigationExtras = {
	// 		queryParams: {
	// 			special: JSON.stringify(id)
	// 		}
  //   };
  //   this.router.navigateByUrl('/students/addupdate/id',studentId);
  // }

  deleteStudent(id:string){
    console.log("Delete student",id);
    // this.mainService.deleteStudent(id).subscribe((res:any)=>{
    // });
    this.mainService.deleteStudent(id).subscribe((response:any)=>{  
            console.log(response.status);
            if(response.status == 1){
              console.log("Data deleted successfully");
              
              this.mainService.listStudent().subscribe((res:any)=>{
              console.log(res);
              if(res.status == 1){
                this.studentList = res.data;
                
              }
            });
            //this.router.navigateByUrl('/students');
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
