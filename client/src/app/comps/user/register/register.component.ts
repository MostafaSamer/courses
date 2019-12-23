import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerName;
    registerEmail;
    registerGender = true;
    registerPass;
    registerConPass;
    err = false;
    error_mess;

  constructor(
      private api: ApiService,
      private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
      this.api.register(this.registerName, this.registerEmail, this.registerGender, this.registerPass).pipe().subscribe((data)=> {
          console.log(data)
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
