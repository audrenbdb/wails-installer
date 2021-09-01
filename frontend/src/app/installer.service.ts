import {Injectable} from '@angular/core';
import {Installer, Status} from './models/installer';

@Injectable({
  providedIn: 'root'
})
export class InstallerService {
  installer: Installer;
  errMsg: string;
  constructor() {}
  async getInstaller(): Promise<Installer> {
    if (!this.installer) {
      // @ts-ignore
      this.installer = await window.backend.wailsBind.Self();
      this.installer.status = Status.NotAccepted;
    }
    return this.installer;
  }

  setInstallerStatus(s: Status) {
    this.installer.status = s;
  }
}


