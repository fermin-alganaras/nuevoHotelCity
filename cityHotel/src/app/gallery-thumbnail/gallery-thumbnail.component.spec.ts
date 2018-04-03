import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryThumbnailComponent } from './gallery-thumbnail.component';

describe('GalleryThumbnailComponent', () => {
  let component: GalleryThumbnailComponent;
  let fixture: ComponentFixture<GalleryThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
