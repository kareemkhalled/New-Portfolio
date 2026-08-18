import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IEducation } from './models/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  constructor(private _http: HttpClient) {}

  private apiURL = `${environment.apiUrl}/education`;

  getEducation() {
    return this._http.get<IEducation[]>(this.apiURL);
  }

  addEducation(education: IEducation) {
    return this._http.post<IEducation>(this.apiURL, education);
  }

  updateEducation(id: string, education: IEducation) {
    return this._http.put<IEducation>(`${this.apiURL}/${id}`, education);
  }

  deleteEducation(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
