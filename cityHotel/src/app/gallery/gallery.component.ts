import { Component, OnInit, Inject } from '@angular/core';
import { GalleryThumbnailComponent } from './../gallery-thumbnail/gallery-thumbnail.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nh-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImages: any;
  lastPortrait = false;
  lastLandscape = false;

  finishLoadPortrait(){
    this.lastPortrait = true;
  }
  finishLoadLandscape(){
    this.lastLandscape = true;
  }

  constructor(@Inject('GalleryService') private galleryService,
              @Inject('GalleryImagesPath') private ImagesPath,
              private route: ActivatedRoute) {
                this.galleryImages = this.route.snapshot.data.galleryImages;
              }

  ngOnInit() {
  }

}
