import { Component } from '@angular/core';
import { ProjectItem } from './project-item/project-item';
import { AddProject } from './add-project/add-project';
import { ProjectService } from '../../core/services/project-service';
import { IProject } from '../../core/services/models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectItem, AddProject],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  projects!: IProject[];

  constructor(private _projectService: ProjectService) {
    this.loadProjects();
  }

  loadProjects() {
    this._projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }
}
