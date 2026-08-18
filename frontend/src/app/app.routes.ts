import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ExperienceComponent } from './pages/experience/experience.component';

import { Dashboard } from './dashboard/dashboard';
import { About } from './dashboard/about/about';
import { Projects } from './dashboard/projects/projects';
import { Skills } from './dashboard/skills/skills';
import { Education } from './dashboard/education/education';
import { Experience } from './dashboard/experience/experience';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', redirectTo: '' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'experience', component: ExperienceComponent },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      { path: 'about', component: About },
      { path: 'projects', component: Projects },
      { path: 'skills', component: Skills },
      { path: 'education', component: Education },
      { path: 'experience', component: Experience },
    ],
  },
];
