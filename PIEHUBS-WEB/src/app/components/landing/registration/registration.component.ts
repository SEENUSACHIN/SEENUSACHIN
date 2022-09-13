import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../../../app.component.css']
})
export class RegistrationComponent implements OnInit {

  regdata = { firstname: '', phone: '', email: '', username: '', password: '' }
  registrationform!: FormGroup

  constructor(private route:Router, private alterEgoValidator: UniqueAlterEgoValidator) { }

  get firstname() { return this.registrationform.get('firstname')!; }
  get phone() { return this.registrationform.get('phone')!; }
  get email() { return this.registrationform.get('email')!; }
  get username() { return this.registrationform.get('username')!; }
  get password() { return this.registrationform.get('password')!; }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
		this.registrationform = new FormGroup({
        firstname: new FormControl(this.regdata.firstname, [
          Validators.required,
        ]),
        email: new FormControl(this.regdata.email, [
          Validators.required,
          Validators.email
        ]),
        phone: new FormControl(this.regdata.phone, [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[0-9]*$')
        ]),
        username: new FormControl(this.regdata.username, [
          Validators.required,
        ]),
        password: new FormControl(this.regdata.password, [
          Validators.required,
        ])
      },
      { validators: identityRevealedValidator }
    );
	}

  submitUser() {
    this.route.navigate(['/SignIn']);
  }

}
