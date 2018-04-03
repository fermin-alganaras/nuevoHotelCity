import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'nh-gallery-thumbnail',
  templateUrl: './gallery-thumbnail.component.html',
  styleUrls: ['./gallery-thumbnail.component.scss']
})
export class GalleryThumbnailComponent implements OnInit {

  @Input() image;

  isModalOpen = false;

  onOpen() {
    this.isModalOpen = true;
  }

  constructor(@Inject('GalleryImagesPath') private ImagesPath) { }

  ngOnInit() {
  }

}
