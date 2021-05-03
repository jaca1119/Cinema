import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieConfigComponent } from './movie-config.component';

describe('MovieConfigComponent', () => {
  let component: MovieConfigComponent;
  let fixture: ComponentFixture<MovieConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieConfigComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
