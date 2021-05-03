import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieConfigViewComponent } from './movie-config-view.component';

describe('MovieConfigViewComponent', () => {
  let component: MovieConfigViewComponent;
  let fixture: ComponentFixture<MovieConfigViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieConfigViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieConfigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
