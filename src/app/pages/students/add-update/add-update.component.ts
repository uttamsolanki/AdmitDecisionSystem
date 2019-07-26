import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
        degreeType: [''],
        instituteScore: ['', Validators.required],
        scoreType: [''],
        studentId: [''],
        uWinDegreeType: [''],
        uWinScore: [''],
        uWinScoreType: ['']
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
      this.formInvalid = false;
      console.log("Logged Values:",this.f.firstname.value,this.f.lastname.value,this.f.emailId.value,this.f.contactNumber.value,this.f.country.value,
      this.f.instituteName.value,this.f.degreeType.value,this.f.instituteScore.value,this.f.scoreType.value,this.f.studentId.value,
      this.f.uWinDegreeType.value,this.f.uWinScore.value, this.f.uWinScoreType.value);
      
      this.mainService.addStudent(this.f.firstname.value,this.f.lastname.value,this.f.emailId.value,this.f.contactNumber.value,this.f.country.value,
        this.f.instituteName.value,this.f.degreeType.value,this.f.instituteScore.value,this.f.scoreType.value,this.f.studentId.value,
        this.f.uWinDegreeType.value,this.f.uWinScore.value, this.f.uWinScoreType.value).subscribe((response:any)=>{	
          console.log(response.status);
          if(response.status == 1){
            console.log("Data added successfully");
            
            //this.router.navigateByUrl('/dashboard');
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
      
}
    