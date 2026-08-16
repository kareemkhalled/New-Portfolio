import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '../../../models/project.model';
import { ProjectService } from '../../../core/services/project-service';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [],
  templateUrl: './project-item.html',
  styleUrl: './project-item.css',
})
export class ProjectItem {
  @Input() myProject!: IProject;

  @Output() doDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _projectService: ProjectService) {}

  delete() {
    this._projectService.deleteProject(this.myProject._id!).subscribe(() => {
      this.doDelete.emit();
    });
  }
}
