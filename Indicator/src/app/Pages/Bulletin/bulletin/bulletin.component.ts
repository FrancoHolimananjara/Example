import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/data.service';
import { IndicatorService } from 'src/app/Services/indicator.service';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {

  indicatorSubscription: Subscription;
  allIndicators = [];

  Rating = ['Faible', 'Moyen', 'Bon', 'Excellent']
  MoisString = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  Mois = [];

  ResponsePourcentage: any;

  constructor(private indicatorService: IndicatorService, private dataService: DataService) { }

  selected: number = 1;

  ngOnInit(): void {
    this.indicatorSubscription = this.indicatorService.GetAllIndicator().subscribe(
      (response: any[]) => {
        for (let i = 0; i < response.length; i++) {
          this.allIndicators.push(response[i])
        }
      }
    )
    this.dataService.getMois().subscribe(
      (response) => {
        for (let i = 0; i < response.length; i++) {
          this.Mois.push(response[i])
        }
      }
    )

  }

  selectOption(event: any) {
    //getted from binding
    // console.log(typeof (this.selected))
    // console.log(event.target.value);

    let index = this.MoisString.indexOf(event.target.value) + 1
    this.dataService.getPourcentageParMois(index).subscribe(
      (response) => {
        this.ResponsePourcentage = response['%'];
      }
    )
  }

}
