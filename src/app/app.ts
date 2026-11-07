import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { IconService } from './core/services/icon.service';
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('node-tfi');


  constructor(private router: Router, private iconService: IconService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        localStorage.setItem('lastUrl', event.urlAfterRedirects);
      });
    this.iconService.registerSocialIcons();
  }

  ngOnInit(): void {
    const lastUrl = localStorage.getItem('lastUrl');

    if (lastUrl) {
      this.router.navigateByUrl(lastUrl);
    }
  }
}
