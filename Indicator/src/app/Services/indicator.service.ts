import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Indicator } from '../Models/Indicator.model';

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {

  private indicators: Indicator[];
  indicatorSubject = new Subject<Indicator[]>();

  private baseURL = "http://localhost:3001/";

  constructor(private _http: HttpClient) { }

  PostIndicator(indicator: Indicator) {
    return this._http.post(this.baseURL + "indicator", indicator).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
  }
  GetAllIndicator() {
    return this._http.get<any[]>(this.baseURL + "indicator");
  }
  DeleteOneIndicator(id: number) {
    return this._http.delete(this.baseURL + "indicator/" + id).subscribe(
      () => {
        console.log('Suppression de ' + id + ' terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )
  }

  emitIndicators() {
    this.indicatorSubject.next(this.indicators.slice());
  }

  addIndicator(indicator: Indicator) {
    this.indicators.push(indicator);
    this.emitIndicators();
  }

  getIndicators() {
    return this.indicatorSubject;
  }
}
