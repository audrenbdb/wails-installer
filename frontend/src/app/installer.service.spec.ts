import { TestBed } from '@angular/core/testing';

import { InstallerService } from './installer.service';

describe('InstallerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstallerService = TestBed.get(InstallerService);
    expect(service).toBeTruthy();
  });
});
