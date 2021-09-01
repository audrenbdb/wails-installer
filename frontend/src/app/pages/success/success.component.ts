import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {InstallerService} from '../../installer.service';
import {Installer} from '../../models/installer';
import {fadeIn} from '../../animations/animations';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
  animations: [fadeIn]
})
export class SuccessComponent implements AfterViewInit {
  installer: Installer;
  expanded = false;

  successMessageLoaded = false;

  constructor(public sanitizer: DomSanitizer, installerService: InstallerService) {
    installerService.getInstaller().then(i => {
      this.installer = i;
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.successMessageLoaded = true;
    }, 100);
  }
  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
