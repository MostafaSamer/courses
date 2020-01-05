import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mune',
  templateUrl: './mune.component.html',
  styleUrls: ['./mune.component.scss']
})
export class MuneComponent implements OnInit {

    slider = [
        {
            'header': 'Account',
            'data': ['login', 'profile']
        },
        {
            'header': 'Courses',
            'data': ['Recomeded Courses', 'Course of the day']
        },
        {
            'header': 'Application',
            'data': ['Rate us', 'Send Feedback & Rebort', 'Ads removal', 'Privacy Policy']
        }
    ]

  constructor() { }

  ngOnInit() {
  }

}
