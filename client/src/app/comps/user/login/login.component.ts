import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    err = false;
    error_mess;
    userForm;

  constructor(
      private api: ApiService,
      private router: Router,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
      this.userForm = this.formBuilder.group({
          email: ['', [Validators.required]],
          pass: ['', [Validators.required]],
      });
  }

  onSubmit() {
      this.api.login(
          this.userForm.get('email').value,
          this.userForm.get('pass').value
      ).pipe().subscribe((data)=> {
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
