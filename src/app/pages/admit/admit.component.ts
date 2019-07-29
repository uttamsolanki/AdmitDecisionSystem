import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Chart from 'chart.js';
import { universityModal } from '../../modals/universityModal';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-admit',
  templateUrl: './admit.component.html',
  styleUrls: ['./admit.component.scss']
})
export class AdmitComponent implements OnInit {
  universityList : universityModal[];

  searched = false;

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  admitForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private mainService : MainService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.mainService.listUniversity().subscribe((res:any)=>{
      console.log(res);
      console.log(res.data);
      if(res.status == 1){
        this.universityList = res.data;
      }
    });

    this.admitForm = this.formBuilder.group({
      previousInst: ['']
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.admitForm.controls; }

  getUniversityData(){
    this.searched = true;

    this.mainService.universityResult(this.f.previousInst.value).subscribe((res:any)=>{
      console.log(res);
      console.log(res.data);
    });

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});

    this.updateOptions();
  }
  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
