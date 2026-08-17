import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kareem Portfolio';
  menuOpen = signal(false);
  isDashboard = signal(false);

  constructor(private router: Router) {
    this.isDashboard.set(this.router.url.startsWith('/dashboard'));
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.isDashboard.set(e.urlAfterRedirects.startsWith('/dashboard'));
        this.menuOpen.set(false);
      });
  }

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
