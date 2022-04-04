import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndicatorService } from './indicator.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }
  private baseURL = "http://localhost:3001/";

  getMois() {
    return this._http.get<any>(this.baseURL + "data/mois");
  }
  getPourcentageParMois(mois: number) {
    return this._http.get<any>(this.baseURL + "data/" + mois);
  }

}
