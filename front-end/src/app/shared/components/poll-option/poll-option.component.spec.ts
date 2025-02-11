import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollOptionComponent } from './poll-option.component';
import { By } from '@angular/platform-browser';

describe('PollOptionComponent', () => {
  let component: PollOptionComponent;
  let fixture: ComponentFixture<PollOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollOptionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PollOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display input data', () => {
    component.entryTitle = 'Test';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.entry-name'))
      .nativeElement;
    expect(title.textContent).toBe('Test');
  });

  it('should display default message if no title is passed', () => {
    component.entryTitle = undefined;
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.entry-name'))
      .nativeElement;
    expect(title.textContent).toBe('no title found');
  });

  it('should emit an event countVote', () => {
    spyOn(component.countVote, 'emit');
    const voteElement = fixture.debugElement.query(
      By.css('.poll-entry-container')
    ).nativeElement;
    voteElement.click();
    expect(component.countVote.emit).toHaveBeenCalled();
  });
});
