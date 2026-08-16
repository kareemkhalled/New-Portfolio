import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProject } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private _http: HttpClient) {}

  private apiURL = `${environment.apiUrl}/projects`;

  getProjects() {
    return this._http.get<IProject[]>(this.apiURL);
  }

  addProject(project: IProject) {
    return this._http.post<IProject>(this.apiURL, project);
  }

  updateProject(id: string, project: IProject) {
    return this._http.put<IProject>(`${this.apiURL}/${id}`, project);
  }

  deleteProject(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
