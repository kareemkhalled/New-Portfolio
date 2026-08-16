import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IExperience } from '../../models/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private _http: HttpClient) {}

  private apiURL = `${environment.apiUrl}/experience`;

  getExperience() {
    return this._http.get<IExperience[]>(this.apiURL);
  }

  addExperience(experience: IExperience) {
    return this._http.post<IExperience>(this.apiURL, experience);
  }

  updateExperience(id: string, experience: IExperience) {
    return this._http.put<IExperience>(`${this.apiURL}/${id}`, experience);
  }

  deleteExperience(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
