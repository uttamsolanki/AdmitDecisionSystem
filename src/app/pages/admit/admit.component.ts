import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Chart from 'chart.js';
import { universityModal } from '../../modals/universityModal';
import { studentModal } from '../../modals/studentModal';

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
  studentList : studentModal[];
  
  searched = false;
  
  studentPrevResult : number[] = [];
  studentWinResult : number[] = [];
  
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
        //console.log(res);
        //console.log(res.data);
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

    var pieChartlabel
      this.searched = true;
      
      this.mainService.universityResult(this.f.previousInst.value).subscribe((res:any)=>{
        //console.log(res);
        console.log(res.data);
        this.studentList = res.data;
        
        let i=0;
        for(i=0;i<this.studentList.length;i++) {
          console.log(Number(this.studentList[i].high_degree_score));
          console.log(this.studentPrevResult);
          this.studentPrevResult.push(Number(this.studentList[i].high_degree_score));
          this.studentWinResult.push(Number(this.studentList[i].uw_score));
        }
        console.log(this.studentPrevResult);
        console.log(this.studentWinResult);

        this.data = this.studentWinResult;
        
      });
      
      // this.datasets = [
      //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
      //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
      // ];
      // this.data = this.datasets[0];
  
  
      var chartOrders = document.getElementById('chart-orders');
  
      parseOptions(Chart, chartOptions());

      chartExample2.data.labels=["Descrease","Stable","Increase"]
      chartExample2.data.datasets=[{label:"Percentages",data:[46,28,24]}]
      var ordersChart = new Chart(chartOrders, {
        type: 'bar',
        options: chartExample2.options,
        data: chartExample2.data
      });
  
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
