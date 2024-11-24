import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAlbumComponent } from './display-album.component';

describe('DisplayAlbumComponent', () => {
  let component: DisplayAlbumComponent;
  let fixture: ComponentFixture<DisplayAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
