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

  universityName;
  numberOfStudent = 0;
  averageWinScore = 0;
  averagePrevScore = 0;
  
  lessThan=0;
  greaterThan=0;
  equalData=0;
  
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

      this.numberOfStudent = 0;
      this.averageWinScore = 0;
      this.averagePrevScore = 0;

      this.lessThan=0;
      this.greaterThan=0;
      this.equalData=0;

      this.studentPrevResult = [];
      this.studentWinResult = [];
    
    this.universityName = this.f.previousInst.value;
    
    var pieChartlabel
      this.searched = true;
      
      this.mainService.universityResult(this.f.previousInst.value).subscribe((res:any)=>{
        //console.log(res);
        console.log(res.data);
        this.studentList = res.data;
        this.numberOfStudent = this.studentList.length;
        let i=0;
        for(i=0;i<this.studentList.length;i++) {
          console.log(Number(this.studentList[i].high_degree_score));
          console.log(this.studentPrevResult);

          var windsorScore = Number(this.studentList[i].uw_score);
          var temp;
          if(!this.studentList[i].high_degree_stype.localeCompare('cgpa')){
            temp = Number(this.studentList[i].high_degree_score);
            temp *= 9.5;
            this.studentPrevResult.push(temp); 
          }
          else if(!this.studentList[i].high_degree_stype.localeCompare('gpa')){
            temp = Number(this.studentList[i].high_degree_score);
            temp = (temp + 1) * 20;
            this.studentPrevResult.push(temp);
          }
          else{
            temp = Number(this.studentList[i].high_degree_score);
            this.studentPrevResult.push(temp);  
          }

          this.averagePrevScore += temp;

          if(windsorScore > temp){
            this.greaterThan++;
          }
          else if(windsorScore < temp){
            this.lessThan++;
          }
          else{
            this.equalData++;
          }
          //this.studentPrevResult.push(Number(this.studentList[i].high_degree_score));
          this.studentWinResult.push(Number(this.studentList[i].uw_score));

          this.averageWinScore += Number(this.studentList[i].uw_score);
        }
        this.averagePrevScore /= this.numberOfStudent;
        this.averageWinScore /= this.numberOfStudent;

        console.log(this.studentPrevResult);
        console.log(this.studentWinResult);

        this.data = this.studentWinResult;
        console.log("Data", this.greaterThan, this.lessThan, this.equalData);
        var chartOrders = document.getElementById('chart-orders');

        parseOptions(Chart, chartOptions());

        chartExample2.data.labels=["> Previous","= Previous","< Previous"]
        chartExample2.data.datasets=[{label:"Percentages",data:[this.greaterThan,this.equalData,this.lessThan]}]
        console.log(chartExample2.data.datasets);
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
      });
      
      // this.datasets = [
      //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
      //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
      // ];
      // this.data = this.datasets[0];
  
  

  
    }
    public updateOptions() {
      this.salesChart.data.datasets[0].data = this.data;
      this.salesChart.update();
    }
  }
