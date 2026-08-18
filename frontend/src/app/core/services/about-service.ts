import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IAbout } from './models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private _http: HttpClient) {}

  private apiURL = `${environment.apiUrl}/about`;

  getAbout() {
    return this._http.get<IAbout>(this.apiURL);
  }

  updateAbout(about: IAbout) {
    return this._http.put<IAbout>(this.apiURL, about);
  }
}
