import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EducationService } from '../../core/services/education-service';
import { IEducation } from '../../core/services/models/education.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  education!: IEducation[];

  constructor(private _educationService: EducationService) {
    this.loadEducation();
  }

  loadEducation() {
    this._educationService.getEducation().subscribe((data) => {
      this.education = data;
    });
  }

  onSubmit(myForm: NgForm) {
    this._educationService.addEducation(myForm.value).subscribe(() => {
      myForm.reset();
      this.loadEducation();
    });
  }

  delete(id: string) {
    this._educationService.deleteEducation(id).subscribe(() => {
      this.loadEducation();
    });
  }
}
