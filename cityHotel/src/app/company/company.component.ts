import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'nh-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  constructor(@Inject('Assets') private ASSETS_PATH) { }

  ngOnInit() {
  }

}
