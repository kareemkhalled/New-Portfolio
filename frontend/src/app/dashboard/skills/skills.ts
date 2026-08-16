import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SkillService } from '../../core/services/skill-service';
import { ISkill } from '../../models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  skills!: ISkill[];

  constructor(private _skillService: SkillService) {
    this.loadSkills();
  }

  loadSkills() {
    this._skillService.getSkills().subscribe((data) => {
      this.skills = data;
    });
  }

  onSubmit(myForm: NgForm) {
    this._skillService.addSkill(myForm.value).subscribe(() => {
      myForm.reset();
      this.loadSkills();
    });
  }

  delete(id: string) {
    this._skillService.deleteSkill(id).subscribe(() => {
      this.loadSkills();
    });
  }
}
