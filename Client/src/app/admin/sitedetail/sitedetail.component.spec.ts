import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitedetailComponent } from './sitedetail.component';

describe('SitedetailComponent', () => {
  let component: SitedetailComponent;
  let fixture: ComponentFixture<SitedetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitedetailComponent]
    });
    fixture = TestBed.createComponent(SitedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
