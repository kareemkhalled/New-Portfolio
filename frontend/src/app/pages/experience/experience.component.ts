import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceService } from '../../core/services/experience-service';
import { EducationService } from '../../core/services/education-service';
import { IExperience } from '../../models/experience.model';
import { IEducation } from '../../models/education.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experience: IExperience[] = [];
  education: IEducation[] = [];

  constructor(
    private experienceService: ExperienceService,
    private educationService: EducationService
  ) {}

  ngOnInit(): void {
    this.experienceService.getExperience().subscribe((data) => {
      this.experience = data;
    });
    this.educationService.getEducation().subscribe((data) => {
      this.education = data;
    });
  }
}
