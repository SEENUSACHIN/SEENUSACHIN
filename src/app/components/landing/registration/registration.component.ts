import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../../../app.component.css']
})
export class RegistrationComponent implements OnInit {
  // OtpId: any;
  token: any;
  standards = ["1","2","3","4","5","6","7","8","9","10","11","12"]
  selected = ""
  regdata = { first_name: '', last_name: '', school_name: '', standard: '', password: '' }
  registrationform!: FormGroup

  constructor(private route:Router, private alterEgoValidator: UniqueAlterEgoValidator, private httpClient: HttpClient,private service: MyserviceService ) { }

  get first_name() { return this.registrationform.get('first_name')!; }
  get last_name() { return this.registrationform.get('last_name')!; }
  get school_name() { return this.registrationform.get('school_name')!; }
  get standard() { return this.registrationform.get('standard')!; }
  // get username() { return this.registrationform.get('username')!; }
  get password() { return this.registrationform.get('password')!; }

  ngOnInit(): void {
    this.initForm()
    // this.OtpId =  localStorage.getItem('id')

  }
  private initForm() {
		this.registrationform = new FormGroup({
      first_name: new FormControl(this.regdata.first_name, [
          Validators.required
        ]),
        last_name: new FormControl(this.regdata.last_name, [Validators.required]),
        school_name: new FormControl(this.regdata.school_name, [
          Validators.required,
        ]),
        standard: new FormControl(this.regdata.standard, [
          Validators.required,
          // Validators.minLength(2),
        ]),
        // username: new FormControl(this.regdata.username, [
        //   Validators.required,
        // ]),
        password: new FormControl(this.regdata.password, [
          Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      },
      { validators: identityRevealedValidator }
    );
	}

  submitUser() {
    var data = {
      first_name : this.registrationform.value.first_name,
      last_name : this.registrationform.value.last_name,
      school_name : this.registrationform.value.school_name,
      standard : this.registrationform.value.standard,
      password : this.registrationform.value.password
    }
    this.service.register(data).subscribe((res:any)=>{
      this.token = res.data.token
      console.log(this.token);
      localStorage.setItem('token', this.token)
      })
      this.route.navigate(['/dashboard']);
  }
  update(e: any){
    this.selected = e.target.value
  }

}
