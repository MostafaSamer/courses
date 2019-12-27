import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          gender: ['', [Validators.required]],
          pass: ['', [Validators.required, Validators.minLength(8)]],
          conPass: ['', [Validators.required]],
      });
  }

  onSubmit() {
      this.api.register(
          this.userForm.get('name').value,
          this.userForm.get('email').value,
          this.userForm.get('gender').value,
          this.userForm.get('pass').value
      ).pipe().subscribe((data)=> {
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
