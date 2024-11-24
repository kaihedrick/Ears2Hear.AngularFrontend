import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlbumsComponent } from './list-albums.component';

describe('ListAlbumsComponent', () => {
  let component: ListAlbumsComponent;
  let fixture: ComponentFixture<ListAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAlbumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
