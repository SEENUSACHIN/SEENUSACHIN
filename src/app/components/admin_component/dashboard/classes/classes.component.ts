import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css','../dashboard-layout/dashboard-layout.component.css']
})
export class ClassesComponent implements OnInit {
  classes = []
  errorShow = ''
  @ViewChild('closebutton') closebutton : any;
  createClassform!: FormGroup
  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService) { }

  ngOnInit(): void {
    document.getElementById("collapseTrigger")?.click();
    this.createClassform = new FormGroup({
      classname: new FormControl("", Validators.required),
    })
    this.getClasses()
  }

  getClasses () {
    this.manage.getClasses().subscribe((response: any) => {
      if(response.success) {
        this.classes = response.class
      }
    });
  }

  createClass () {
    console.log('createClassform ', this.createClassform.value)
    if(this.createClassform.value.classname == '') {
      this.errorShow = "Please enter the Class name."
    } else {
      var data = {
        class_name : this.createClassform.value.classname
      }
      this.manage.createClass(data).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")
          this.getClasses ()
        }
      });
    }
  }
}
