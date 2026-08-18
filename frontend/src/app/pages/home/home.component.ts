import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AboutService } from '../../core/services/about-service';
import { IAbout } from '../../core/services/models/about.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  about: IAbout | null = null;

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe((data) => {
      this.about = data;
    });
  }
}
