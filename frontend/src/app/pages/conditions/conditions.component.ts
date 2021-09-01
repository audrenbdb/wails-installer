import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Installer, Status} from '../../models/installer';
import {DomSanitizer} from '@angular/platform-browser';
import {fadeInList} from '../../animations/animations';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.css'],
  animations: [fadeInList]
})
export class ConditionsComponent implements AfterViewInit {
  @Input() installer: Installer;
  isRead: boolean;
  @ViewChild('conditions', {static: false}) conditions;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const c = new ScrollController(this.conditions.nativeElement);
      c.onReachingBottom(() => this.isRead = true);
    });
  }

  onAccept() {
    if (this.installer.mustReadAllConditions && !this.isRead) {
      return;
    }
    this.installer.status = Status.Processing;
  }
}

class ScrollController {
  el: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  onReachingBottom(fn: any) {
    if (this.isScrolledBottom) {
      return fn();
    }
    const onReachingBottom = () => {
      if (this.isScrolledBottom) {
        this.el.removeEventListener('scroll', onReachingBottom);
        return fn();
      }
    };
    this.el.addEventListener('scroll', onReachingBottom);
  }



  get isScrolledBottom(): boolean {
    const scrolled = this.el.scrollTop;
    const offsetHeight = this.el.offsetHeight;
    const height = this.el.scrollHeight - this.el.offsetHeight;
    const totalRead = scrolled / height;
    const minThreshold = .96;
    return height < offsetHeight || totalRead > minThreshold;
  }
}
