import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'client';
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
}
