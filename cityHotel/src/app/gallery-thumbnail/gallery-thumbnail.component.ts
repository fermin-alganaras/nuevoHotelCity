import { Component, OnInit, Inject, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nh-gallery-thumbnail',
  templateUrl: './gallery-thumbnail.component.html',
  styleUrls: ['./gallery-thumbnail.component.scss']
})
export class GalleryThumbnailComponent implements OnInit {
   closeResult: string;

  @Input() image;

  constructor(@Inject('GalleryImagesPath') private ImagesPath,
              private modalService: NgbModal
             ) { }


   open(content) {
     this.modalService.open(content).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }

   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
   }

  ngOnInit() {
  }

}
