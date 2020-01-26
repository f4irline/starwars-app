import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-testing';

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.iconRegistry.addSvgIcon('arrow_up', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_up.svg'));
    this.iconRegistry.addSvgIcon('arrow_down', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow_down.svg'));
    this.iconRegistry.addSvgIcon('unfold_more', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/unfold_more.svg'));
    this.iconRegistry.addSvgIcon('visibility', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility.svg'));
    this.iconRegistry.addSvgIcon('visibility_off', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility_off.svg'))
  }
}
