import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
   selector: 'nh-modalComponent',
   templateUrl: './modal.component.html',
})

export class ModalComponent implements OnInit {
  @Input() showModal: boolean;

  @Output() close: EventEmitter<any> = new EventEmitter();

  closeModal() {
    this.showModal = false;
    this.close.emit();
  }

  constructor() {}

  ngOnInit() {
  }

}
