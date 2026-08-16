import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ISkill } from '../../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  constructor(private _http: HttpClient) {}

  private apiURL = `${environment.apiUrl}/skills`;

  getSkills() {
    return this._http.get<ISkill[]>(this.apiURL);
  }

  addSkill(skill: ISkill) {
    return this._http.post<ISkill>(this.apiURL, skill);
  }

  updateSkill(id: string, skill: ISkill) {
    return this._http.put<ISkill>(`${this.apiURL}/${id}`, skill);
  }

  deleteSkill(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
