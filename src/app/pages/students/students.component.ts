import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewData(){
    this.router.navigateByUrl('/students/view');
  }
}
