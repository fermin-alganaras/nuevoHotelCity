import { Component, OnInit, Inject } from '@angular/core';
import { GalleryThumbnailComponent } from './../gallery-thumbnail/gallery-thumbnail.component';

@Component({
  selector: 'nh-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {



  constructor(@Inject('GalleryService') private galleryService, @Inject('GalleryImagesPath') private ImagesPath) { }

  ngOnInit() {
  }

}
