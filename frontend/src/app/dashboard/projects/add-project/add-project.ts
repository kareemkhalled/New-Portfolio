import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../../core/services/project-service';
import { UploadService } from '../../../core/services/upload-service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  private _projectService = inject(ProjectService);
  private _uploadService = inject(UploadService);

  @Output() doAdd: EventEmitter<void> = new EventEmitter<void>();

  selectedFile: File | null = null;

  myForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    liveUrl: new FormControl(''),
    githubUrl: new FormControl(''),
    technologies: new FormControl(''),
  });

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    const project = {
      title: this.myForm.get('title')?.value,
      description: this.myForm.get('description')?.value,
      liveUrl: this.myForm.get('liveUrl')?.value,
      githubUrl: this.myForm.get('githubUrl')?.value,
      technologies: this.myForm.get('technologies')?.value
        ? this.myForm.get('technologies')?.value.split(',').map((t: string) => t.trim())
        : [],
    };

    if (this.selectedFile) {
      this._uploadService.uploadImage(this.selectedFile).subscribe((res) => {
        this.saveProject({ ...project, imageUrl: res.imageUrl });
      });
    } else {
      this.saveProject(project);
    }
  }

  saveProject(project: any) {
    this._projectService.addProject(project).subscribe(() => {
      this.myForm.reset();
      this.selectedFile = null;
      this.doAdd.emit();
    });
  }
}
