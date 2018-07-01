import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'nh-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(@Inject('CONSTANTS') public CONSTANTS, @Inject('Assets') public ASSETS_PATH) { }

  ngOnInit() {
  }

}
