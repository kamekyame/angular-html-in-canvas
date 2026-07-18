import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlInCanvas } from './html-in-canvas';

describe('HtmlInCanvas', () => {
  let component: HtmlInCanvas;
  let fixture: ComponentFixture<HtmlInCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlInCanvas],
    }).compileComponents();

    fixture = TestBed.createComponent(HtmlInCanvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
