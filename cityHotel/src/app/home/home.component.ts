import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'nh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(@Inject('Assets') public ASSETS_PATH) { }

  ngOnInit() {
  }

}
