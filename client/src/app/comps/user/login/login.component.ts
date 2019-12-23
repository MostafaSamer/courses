import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginEmail;
    loginPass;
    err = false;
    error_mess;

  constructor(
      private api: ApiService,
      private router: Router,
  ) { }

  ngOnInit() {

  }

  onSubmit() {
      this.api.login(this.loginEmail, this.loginPass).pipe().subscribe((data)=> {
          console.log(data.error)
          if(data.error == 1) {
              this.err = true;
              this.error_mess = data.message
          } else {
              this.err = false;
              localStorage.setItem('currentUser', JSON.stringify(data.data))
              this.router.navigateByUrl('/user/home');
          }
      })
  }

}
