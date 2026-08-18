import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../core/services/skill-service';
import { ISkill } from '../../core/services/models/skill.model';

interface SkillGroup {
  category: string;
  skills: ISkill[];
}

const CATEGORY_ORDER = [
  'Frontend',
  'Backend & DevOps',
  'Industrial/SCADA',
  'AI & Data',
  'Design',
  'Languages',
];

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skills: ISkill[] = [];
  groupedSkills: SkillGroup[] = [];

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data;
      this.groupedSkills = this.groupByCategory(data);
    });
  }

  private groupByCategory(skills: ISkill[]): SkillGroup[] {
    const groups = new Map<string, ISkill[]>();

    for (const skill of skills) {
      const category = skill.category || 'Other';
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category)!.push(skill);
    }

    const rank = (category: string) => {
      const index = CATEGORY_ORDER.indexOf(category);
      return index === -1 ? CATEGORY_ORDER.length : index;
    };

    return [...groups.entries()]
      .sort((a, b) => rank(a[0]) - rank(b[0]))
      .map(([category, skills]) => ({ category, skills }));
  }
}
