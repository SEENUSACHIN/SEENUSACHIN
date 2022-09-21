import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import {Router} from '@angular/router';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { ManageServiceService } from '../manage-service.service';
import { NotificationService } from '../../../notification.service'

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {

  signindata = { email: '', password: ''}
  adminsigninform!: FormGroup
  errorShow : boolean = false
  signinRes : any
  constructor(private route:Router, private alterEgoValidator: UniqueAlterEgoValidator, private manage: ManageServiceService, private notifyService : NotificationService) { }

  get email() { return this.adminsigninform.get('email')!; }
  get password() { return this.adminsigninform.get('password')!; }
  ngOnInit(): void {
    this.initForm()
  }
  private initForm() {
    this.adminsigninform = new FormGroup({
      email: new FormControl(this.signindata.email, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(this.signindata.password, [
          Validators.required
        ])
      },
      { validators: identityRevealedValidator }
    );
	}

  adminSignIn () {
    if(this.adminsigninform.value.email == 'admin@piehubs.com' && this.adminsigninform.value.password == '123456') {
      // adminSignIn
      var data = {
        email : this.adminsigninform.value.email,
        password : this.adminsigninform.value.password
      }
      this.manage.adminSignIn(data).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.signinRes = response;
          localStorage.setItem('token', this.signinRes.token)
          localStorage.setItem('user_id', this.signinRes.user_id)
          this.route.navigate(['/admin_dashboard']);
          this.notifyService.showSuccess("Login success!", "")
        } else {
          this.errorShow = true
        }
      });
    } else {
      this.errorShow = true
    }
  }

}
