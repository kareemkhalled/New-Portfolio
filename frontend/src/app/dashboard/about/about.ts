import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AboutService } from '../../core/services/about-service';
import { IAbout } from '../../core/services/models/about.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private _aboutService = inject(AboutService);

  about!: IAbout;

  constructor() {
    this.loadAbout();
  }

  loadAbout() {
    this._aboutService.getAbout().subscribe((data) => {
      this.about = data;
    });
  }

  onSubmit(myForm: NgForm) {
    this._aboutService.updateAbout(myForm.value).subscribe(() => {
      alert('about updated');
    });
  }
}
