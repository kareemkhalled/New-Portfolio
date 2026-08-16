import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExperienceService } from '../../core/services/experience-service';
import { IExperience } from '../../models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  private _experienceService = inject(ExperienceService);

  experience!: IExperience[];

  myForm: FormGroup = new FormGroup({
    role: new FormControl(''),
    company: new FormControl(''),
    location: new FormControl(''),
    period: new FormControl(''),
    bullets: new FormControl(''),
    technologies: new FormControl(''),
  });

  constructor() {
    this.loadExperience();
  }

  loadExperience() {
    this._experienceService.getExperience().subscribe((data) => {
      this.experience = data;
    });
  }

  onSubmit() {
    const experience = {
      role: this.myForm.get('role')?.value,
      company: this.myForm.get('company')?.value,
      location: this.myForm.get('location')?.value,
      period: this.myForm.get('period')?.value,
      bullets: this.myForm.get('bullets')?.value
        ? this.myForm.get('bullets')?.value.split(',').map((b: string) => b.trim())
        : [],
      technologies: this.myForm.get('technologies')?.value
        ? this.myForm.get('technologies')?.value.split(',').map((t: string) => t.trim())
        : [],
    };

    this._experienceService.addExperience(experience).subscribe(() => {
      this.myForm.reset();
      this.loadExperience();
    });
  }

  delete(id: string) {
    this._experienceService.deleteExperience(id).subscribe(() => {
      this.loadExperience();
    });
  }
}
