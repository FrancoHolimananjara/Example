import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/Services/data.service';
import { IndicatorService } from 'src/app/Services/indicator.service';
import  html2canvas  from 'html2canvas';
import { jsPDF} from 'jspdf';

@Component({
  selector: 'app-bulletin',
  templateUrl: './bulletin.component.html',
  styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {

  indicatorSubscription: Subscription;
  allIndicators = [];
  Bulletin = [
    { Id: 'IND1', Real: 34, Point: 3 ,Coeff: 2, NoteFinale: 5, Obser:'faible', Rang: 5},
    { Id: 'IND2', Real: 45, Point: 2 ,Coeff: 2, NoteFinale: 3, Obser:'bon', Rang: 4},
    { Id: 'IND3', Real: 55, Point: 1 ,Coeff: 2, NoteFinale: 4, Obser:'faible', Rang: 2},
    { Id: 'IND4', Real: 10, Point: 0 ,Coeff: 2, NoteFinale: 1, Obser:'moyen', Rang: 6},
    { Id: 'IND5', Real: 85, Point: 5 ,Coeff: 2, NoteFinale: 7, Obser:'excellent', Rang: 1}
  ];
  Realisation : number=0;
  Notefi : number =0;
  isShow = false;
  Rating = ['Faible', 'Moyen', 'Bon', 'Excellent']
  MoisString = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  Mois = [];

  ResponsePourcentage: any;
  rep: string;

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

    for (let i = 0; i < this.Bulletin.length; i++) {
         this.Realisation+= this.Bulletin[i].Real
         this.Notefi+= this.Bulletin[i].NoteFinale

    }
    this.Realisation/=this.Bulletin.length;

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
    this.response()
  }
  response() {
    for (let i = 0; i < this.allIndicators.length; i++) {
      console.log(this.allIndicators[i]);
      if (this.ResponsePourcentage < this.allIndicators[i]['indicatorFaible']) {
        console.log('Faible');

        this.rep = 'Faible'
      } else if (this.ResponsePourcentage >= this.allIndicators[i]['indicatorFaible'] && this.ResponsePourcentage < this.allIndicators[i]['indicatorMoyen']) {
        this.rep = 'Moyen'
      } else if (this.ResponsePourcentage >= this.allIndicators[i]['indicatorMoyen'] && this.ResponsePourcentage < this.allIndicators[i]['indicatorBon']) {
        this.rep = 'Bon'
      } else if (this.ResponsePourcentage >= this.allIndicators[i]['indicatorBon']) {
        this.rep = 'Excellent'
      }
    }
  }


  public SavePDF():void{
    var Content = document.getElementById('bulletin');

    html2canvas(Content).then((canvas) => {
      console.log(canvas);

      var imgData = canvas.toDataURL('image/png')
      let doc = new jsPDF('p','mm','a4');
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      doc.addImage(imgData, 'png', 10, 50, 190, fileHeight);
      doc.save('test.pdf');

    })
}
onShow(){
   this.isShow= true;
}
}
