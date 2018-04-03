import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'nh-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(@Inject('CONSTANTS') private CONSTANTS, @Inject('Assets') private ASSETS_PATH) { }

  ngOnInit() {
  }

}
