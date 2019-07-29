import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(private mainService : MainService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {}
    
    ngOnInit() {
      var currentUser = localStorage.getItem("currentUser");
      if(currentUser){
        this.router.navigateByUrl('/student');
      }

      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    ngOnDestroy() {
    }
    
    get f() { return this.loginForm.controls; }

    login(){
      this.submitted = true;
      //console.log("Logged Values:",this.f.username.value,this.f.password.value);
      if (this.loginForm.invalid) {
        return;
      }
      console.log("Logged Values:",this.f.username.value,this.f.password.value);
      this.mainService.login(this.f.username.value,this.f.password.value).subscribe((response:any)=>{	
        console.log(response.status);
        if(response.status == 1){
          console.log("Logged In Successfully");
          
          this.router.navigateByUrl('/students');
          this.loginForm.reset();
          //let data = response.data;
          //console.log(data);
        }
        else{
          console.log("Invalid Credentials!");
        }
      },(err)=>{
        console.log("error");
      });
    }
  }
