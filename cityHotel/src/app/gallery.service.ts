import { Injectable } from '@angular/core';

@Injectable()
export class GalleryService {

  galleryImages = [
    { name: "artistic-bed.jpg", orientation: "landscape"},
    { name: "artistic-bed-4.jpg", orientation: "landscape" },
    { name: "artistic-bedroom-2.jpg", orientation: "landscape" },
    { name: "artistic-bedroom-4.jpg", orientation: "landscape" },
    { name: "artistic-bedroom-5.jpg", orientation: "landscape" },
    { name: "artistic-bedroom-6.jpg", orientation: "landscape" },
    { name: "artistic-bedroom-7.jpg", orientation: "landscape" },
    { name: "artistic-breakfast.jpg", orientation: "landscape" },
    { name: "descriptive-breakfast.jpg", orientation: "landscape" },
    { name: "descriptive-breakfast-2.jpg", orientation: "landscape" },
    { name: "descriptive-bedroom.jpg", orientation: "landscape" },
    { name: "descriptive-bedroom-2.jpg", orientation: "landscape" },
    { name: "descriptive-bedroom-3.jpg", orientation: "landscape" },
    { name: "descriptive-bedroom-5.jpg", orientation: "landscape" },
    { name: "descriptive-bedroom-6.jpg", orientation: "landscape" },
    { name: "descriptive-bedroom-7.jpg", orientation: "landscape" },
    { name: "descriptive-bedroom-4.jpg", orientation: "portrait" },
    { name: "descriptive-bathroom.jpg", orientation: "portrait" },
    { name: "descriptive-bathroom-2.jpg", orientation: "portrait" },
    { name: "artistic-key.jpg", orientation: "portrait" },
    { name: "descriptive-bathroom-4.jpg", orientation: "portrait" },
    { name: "descriptive-bathroom-3.jpg", orientation: "portrait" },
    { name: "hallway.jpg", orientation: "portrait" }
  ];

  constructor() { }

}
