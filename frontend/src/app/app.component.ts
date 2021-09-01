import {Component} from '@angular/core';
import {InstallerService} from './installer.service';
import {Installer, Status as StatusEnum} from './models/installer';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[id="app"]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public Status = StatusEnum;
  installer: Installer;
  constructor(installerService: InstallerService) {
    installerService.getInstaller().then(i => this.installer = i);
  }
}


