import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingViewComponent } from './voting-view.component';

describe('VotingViewComponent', () => {
  let component: VotingViewComponent;
  let fixture: ComponentFixture<VotingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
