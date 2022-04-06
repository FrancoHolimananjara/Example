import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Indicator } from 'src/app/Models/Indicator.model';
import { IndicatorService } from 'src/app/Services/indicator.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss']
})
export class IndicatorComponent implements OnInit, OnDestroy {

  newIndicator: boolean = false;
  O_RIndex: number = 0;
  NbrO_R: number = 0;
  PlaceHolder = ['Objectif', 'Faible (si <= )', 'Moyen (si entre Faible et Moyen)', 'Bon (si entre Moyen et Bon)']
  Comparaison = ['Au moins', 'Au plus', 'Moins de', 'Plus de'];
  Ordre = ['Croissant', 'Décroissant']
  Circuit = ['DAU', 'Rouge', 'Jaune', 'Vert']

  Choix = [{
    'id': 0,
    'name': 'Circuit'
  }]
  isChoice: boolean;
  indicatorForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private indicatorService: IndicatorService, private datePipe: DatePipe) { }

  indicators: Indicator[];
  indicatorSubscription: Subscription;

  allIndicators = [];

  isExpired: boolean;

  ngOnInit(): void {
    this.initForm();
    this.indicatorSubscription = this.indicatorService.GetAllIndicator().subscribe(
      (response: any[]) => {
        for (let i = 0; i < response.length; i++) {
          this.allIndicators.push(response[i])
        }
      }
    )

  }


  ngOnDestroy(): void {
    this.indicatorSubscription.unsubscribe();
  }

  initForm() {
    this.indicatorForm = this.formBuilder.group({
      'indicator': ['', Validators.required],
      'description': ['', Validators.required],
      'objectif_rating': this.formBuilder.array([])
    });
  }

  onSubmit() {
    this.newIndicator = true;
    const formValue = this.indicatorForm.value;
    const newIndicator = new Indicator(
      formValue['indicator'],
      formValue['description'],
      formValue['objectif_rating'][0],
      formValue['objectif_rating'][1],
      formValue['objectif_rating'][2],
      formValue['objectif_rating'][3],
      this.datePipe.transform(new Date(Date.now()), 'YYYY-MM-dd HH:mm:ss'),
      false
    )
    //

    this.indicatorService.PostIndicator(newIndicator)
    //this.indicatorService.addIndicator(newIndicator);

  }

  getO_R() {
    return this.indicatorForm.get('objectif_rating') as FormArray;
  }
  onAddO_R() {
    const newO_R = this.formBuilder.control('', Validators.required);
    this.getO_R().push(newO_R);
    const formValue = this.indicatorForm.value;
    this.NbrO_R = formValue['objectif_rating'].length;
  }


  //Delete Indicator
  onDelete(id: number) {
    this.indicatorService.DeleteOneIndicator(id);
  }

  onChanged(isChecked: boolean) {
    if (isChecked) {
      this.isExpired = false;
      // this.indicatorService.PutIndicator(14, this.isExpired).subscribe(
      //   (response) => {
      //     console.log('Response', response);

      //   }
      // )
    } else {
      this.isExpired = !this.isExpired
    }
  }


  onChange(name: string, isChecked: boolean) {
    if (isChecked) {
      console.log(name);
      this.isChoice = isChecked;
    } else {
      this.isChoice = !this.isChoice;
    }
  }

}
