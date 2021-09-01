import {AfterViewInit, Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {InstallerService} from '../../installer.service';
import {Installer} from '../../models/installer';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.css']
})
export class FailComponent implements AfterViewInit {
  msgLoaded = false;
  installer: Installer;
  errMsg: string;

  constructor(public sanitizer: DomSanitizer, installerService: InstallerService) {
    installerService.getInstaller().then(i => {
      this.installer = i;
      this.errMsg = installerService.errMsg;
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.msgLoaded = true;
    }, 100);
  }

}
