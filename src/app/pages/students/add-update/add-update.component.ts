import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { studentModal } from '../../../modals/studentModal';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss']
})
export class AddUpdateStudentComponent implements OnInit {
  addStudentForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  formInvalid = false;
  studentData:studentModal[];
  studentId="";
  title="Add Student Data";
  buttonText="Add";
  
  constructor(private mainService : MainService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }
    
    ngOnInit() {
      this.addStudentForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        emailId: ['', Validators.required],
        contactNumber: ['', Validators.required],
        country: ['', Validators.required],
        instituteName: ['', Validators.required],
        degreeType: ['bachelors'],
        instituteScore: ['', Validators.required],
        scoreType: ['cgpa'],
        studentId: [''],
        uWinDegreeType: ['bachelors'],
        uWinScore: [''],
        uWinScoreType: ['cgpa']
      });
      
      this.route.params.subscribe(params => {
        this.studentId = params['id'];
        
        if(this.studentId){
          this.title="Update Student Data";
          this.buttonText="Update";
          this.mainService.listStudentId(this.studentId).subscribe((res:any)=>{
            console.log(res);
            if(res.status == 1){
              this.studentData = res.data;
              console.log(this.studentData);
  
              this.f.firstname.setValue(this.studentData[0].fname);
              this.f.lastname.setValue(this.studentData[0].lname);
              this.f.emailId.setValue(this.studentData[0].email);
              this.f.contactNumber.setValue(this.studentData[0].contact);
              this.f.country.setValue(this.studentData[0].country);
              this.f.instituteName.setValue(this.studentData[0].high_degree);
              this.f.degreeType.setValue(this.studentData[0].high_dtype);
              this.f.instituteScore.setValue(this.studentData[0].high_degree_score);
              this.f.scoreType.setValue(this.studentData[0].high_degree_stype);
              this.f.studentId.setValue(this.studentData[0].uwid);
              this.f.uWinDegreeType.setValue(this.studentData[0].uw_degree_type);
              this.f.uWinScore.setValue(this.studentData[0].uw_score);
              this.f.uWinScoreType.setValue(this.studentData[0].uw_stype);
            }
            else{
              console.log("Errrorrorororror!");
            }
          });
        }
      });
      
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    
    get f() { return this.addStudentForm.controls; }
    
    addStudent(){
      this.submitted = true;
      
      if (this.addStudentForm.invalid) {
        console.log("Please fill the form first!");
        this.formInvalid = true;
        return;
      }

      if(!this.buttonText.localeCompare("Update")){
        console.log("Update Student");
        this.mainService.updateStudent(this.studentId,this.f.firstname.value,this.f.lastname.value,this.f.emailId.value,this.f.contactNumber.value,this.f.country.value,
          this.f.instituteName.value,this.f.degreeType.value,this.f.instituteScore.value,this.f.scoreType.value,this.f.studentId.value,
          this.f.uWinDegreeType.value,this.f.uWinScore.value, this.f.uWinScoreType.value).subscribe((response:any)=>{	
            console.log(response.status);
            if(response.status == 1){
              console.log("Data added successfully");
              
              this.router.navigateByUrl('/students');
              this.addStudentForm.reset();
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
      else{
        this.mainService.addStudent(this.f.firstname.value,this.f.lastname.value,this.f.emailId.value,this.f.contactNumber.value,this.f.country.value,
          this.f.instituteName.value,this.f.degreeType.value,this.f.instituteScore.value,this.f.scoreType.value,this.f.studentId.value,
          this.f.uWinDegreeType.value,this.f.uWinScore.value, this.f.uWinScoreType.value).subscribe((response:any)=>{	
            console.log(response.status);
            if(response.status == 1){
              console.log("Data added successfully");
              
              this.router.navigateByUrl('/students');
              this.addStudentForm.reset();
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
      

      this.formInvalid = false;
      console.log("Logged Values:",this.f.firstname.value,this.f.lastname.value,this.f.emailId.value,this.f.contactNumber.value,this.f.country.value,
      this.f.instituteName.value,this.f.degreeType.value,this.f.instituteScore.value,this.f.scoreType.value,this.f.studentId.value,
      this.f.uWinDegreeType.value,this.f.uWinScore.value, this.f.uWinScoreType.value);
    }
      
    }
    