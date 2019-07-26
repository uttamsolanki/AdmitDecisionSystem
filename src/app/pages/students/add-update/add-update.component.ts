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

  constructor(private mainService : MainService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.addStudentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      contactNumber: ['', Validators.required],
      emailId: ['', Validators.required],
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

  login(){
    this.submitted = true;
    
    if (this.addStudentForm.invalid) {
      return;
    }
    console.log("Logged Values:",this.f.scoreType.value,this.f.country.value);
    this.mainService.login(this.f.username.value,this.f.password.value).subscribe((response:any)=>{	
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
