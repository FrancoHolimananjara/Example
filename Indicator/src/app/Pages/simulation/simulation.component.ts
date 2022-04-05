import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IndicatorService } from 'src/app/Services/indicator.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {

  simulationForm: FormGroup;
  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  year = [2021, 2022]
  selectedMonth = "";
  selectedYear = 0;
  indicatorSubscription: Subscription;
  allIndicators = [];
  realisation: any;
  rep: string;


  //Auto
  toggleTo: boolean;
  btn: string = 'Manuel';
  constructor(private formBuilder: FormBuilder, private indicatorService: IndicatorService, private dataService: DataService) { }

  ngOnInit(): void {
    this.initForm();
    this.selectedMonth = this.month[new Date().getMonth()];
    this.selectedYear = this.year[this.year.indexOf(new Date().getFullYear())];
    this.indicatorSubscription = this.indicatorService.GetAllIndicator().subscribe(
      (response: any[]) => {
        for (let i = 0; i < response.length; i++) {
          this.allIndicators.push(response[i])
        }
      }
    )

  }

  initForm() {
    this.simulationForm = this.formBuilder.group({
      'realisation': ['']
    })
  }

  date(mois: string, annee: number, realisation: any) {
    let data = new Map();
    data.set(mois + '/' + annee, realisation);
    console.log(data);
  }

  onSubmit() {
    const formValue = this.simulationForm.value;
    this.realisation = formValue['realisation'];
    this.date(this.month[new Date().getMonth()], new Date().getFullYear(), formValue['realisation'])
    this.response();
  }

  response() {
    for (let i = 0; i < this.allIndicators.length; i++) {
      console.log(this.allIndicators[i]);
      if (this.realisation < this.allIndicators[i]['indicatorFaible']) {
        this.rep = 'Faible'
      } else if (this.realisation >= this.allIndicators[i]['indicatorFaible'] && this.realisation < this.allIndicators[i]['indicatorMoyen']) {
        this.rep = 'Moyen'
      } else if (this.realisation >= this.allIndicators[i]['indicatorMoyen'] && this.realisation < this.allIndicators[i]['indicatorBon']) {
        this.rep = 'Bon'
      } else if (this.realisation >= this.allIndicators[i]['indicatorBon']) {
        this.rep = 'Excellent'
      }
    }
  }
  getColor() {
    if (this.rep == 'Faible') {
      return 'red';
    } else if (this.rep == 'Moyen') {
      return 'orange';
    } else if (this.rep == 'Bon') {
      return 'yellow';
    } else if (this.rep == 'Excellent') {
      return 'green'
    }
  }

  onChange(isToggle: boolean) {
    if (isToggle) {
      console.log('Auto');
      this.toggleTo = false;
    } else {
      console.log('Manuel');
      this.toggleTo = !this.toggleTo
    }
  }

  retRealisation() {
    if (this.toggleTo) {
      return 'En mode manuel'
    } else {
      return 'En mode auto'
    }
  }



}

