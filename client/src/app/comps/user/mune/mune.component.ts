import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mune',
  templateUrl: './mune.component.html',
  styleUrls: ['./mune.component.scss']
})
export class MuneComponent implements OnInit {

    image_pos = '../../../../assets/menu/login/';

    slider = [
        {
            'header': 'Account',
            'data': [{
                'img': `${this.image_pos}Group 80.png`,
                'title': "login"
            }, {
                'img': "",
                'title': "profile"
            }]
        },
        {
            'header': 'Courses',
            'data': [{
                'img': "",
                'title': "Recomeded Courses"
            }, {
                'img': "",
                'title': "Course of the day"
            }]
        },
        {
            'header': 'Application',
            'data': [{
                'img': "",
                'title': "Rate us"
            }, {
                'img': "",
                'title': "Send Feedback & Rebort"
            }, {
                'img': "",
                'title': "Ads removal"
            }, {
                'img': "",
                'title': "Privacy Policy"
            }]
        }
    ]

  constructor() { }

  ngOnInit() {
  }

}
