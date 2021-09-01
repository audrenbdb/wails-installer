import {Component, OnInit} from '@angular/core';
import {Installer, Status, Step} from '../../models/installer';
import {InstallerService} from '../../installer.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  loadAnimation = false;

  installer: Installer;
  lastDoneStep: Step;
  runningStep: Step;
  upcomingStep: Step;

  constructor(public sanitizer: DomSanitizer, private installerService: InstallerService) {
    installerService.getInstaller().then(i => {
      this.installer = i;
      const p = this.processEachStep();
    });
  }

  ngOnInit() {
    this.preloadPage();
  }

  async preloadPage() {
    await this.sleep(100);
    this.loadAnimation = true;
  }

  async processEachStep(i: number = 0) {
    if (this.noStepsRemaining(i)) {
      return this.installer.status = Status.DoneWithoutError;
    }
    this.setUpcomingStep(i);
    try {
      await this.processStepAtIndex(i);
    } catch (err) {
      return this.installer.status = Status.DoneWithError;
    }
    return this.processEachStep(i + 1);
  }

  setUpcomingStep(currentStepIndex: number) {
    if (this.noUpcomingSteps(currentStepIndex)) {
      return this.upcomingStep = null;
    }
    return this.upcomingStep = this.installer.steps[currentStepIndex + 1];
  }

  noStepsRemaining(currentIndex: number): boolean {
    return currentIndex === this.installer.steps.length;
  }

  noUpcomingSteps(currentIndex: number): boolean {
    return currentIndex + 1 >= this.installer.steps.length;
  }

  async processStepAtIndex(i: number) {
    const s = this.installer.steps[i];
    this.runningStep = s;
    try {
      await this.installStep(i);
    } catch (err) {
      throw err;
    }
    s.done = true;
    await this.sleep(1000);
    this.lastDoneStep = s;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async installStep(i: number) {
    try {
      // @ts-ignore
      await window.backend.wailsBind.InstallStep(i);
    } catch (err) {
      this.installerService.errMsg = err;
      throw err;
    }
  }

}
