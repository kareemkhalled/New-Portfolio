import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../core/services/skill-service';
import { ISkill } from '../../models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skills: ISkill[] = [];

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data;
    });
  }
}
