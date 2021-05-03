import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListConfigComponent } from './movie-list-config.component';

describe('MovieListConfigComponent', () => {
  let component: MovieListConfigComponent;
  let fixture: ComponentFixture<MovieListConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieListConfigComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
