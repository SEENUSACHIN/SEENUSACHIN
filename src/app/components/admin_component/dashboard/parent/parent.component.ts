import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { identityRevealedValidator } from '../../../../shared/identity-revealed.directive';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css','../dashboard-layout/dashboard-layout.component.css']
})
export class ParentComponent implements OnInit {
  inventorList:any = [];
  activitylist = []
  selectedAct = []
  selectform!: FormGroup
  myFiles: string[] = [];
  selectedSchool = []
  selectedStudent = []
  selectedKid = []
  schoollist = []
  studentlist = []
  expList = []
  classes = []
  students = []
  curriculum = []
  activitygroupList = []
  chapters = []
  users = []
  classId = ''
  studentId = ''
  subId = ''
  schoolName = ''
  chapterId = ''
  uploadform!: FormGroup
  selected_school : string = ''
  selectExplore : string = ''
  goal_Id = ''
  errorShow = ''
  loader = true;
  goalslist = []
  weeks :  { id: string; label1: string }[] = []
  ratingdata = { username: '', rating: '',url:  '',
  comments: ''}
  vdolist = [
    { id : "1", name : "Harini", class: "7", school: "Chem Roast", date : "06-09-2022", activity_name : 'Activity name1', score: '29', profile : '' },
    // { id : "2", name : "Jayaharini T", class: "12", school: "Chem Roast ijk uh", date : "16-09-2022", activity_name : 'Activity name2', score: 'New', profile : '' },
    // { id : "3", name : "Deepika", class: "3", school: "Chem Roast da", date : "08-09-2022", activity_name : 'Activity name3', score: '29', profile : '' },
  ]
  studentid = ''
  activity_grp = ''
  activityID = ''
  @ViewChild('closebutton') closebutton : any;

  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService,public datepipe: DatePipe, private ngxService : NgxUiLoaderService) { }

  // get username() { return this.uploadform.get('username')!; }
  get rating() { return this.uploadform.get('rating')!; }
  get comments() { return this.uploadform.get('comments')!; }
  get video() { return this.uploadform.get('video')!; }
  get url() { return this.uploadform.get('url')!; }

  ngOnInit(): void {
    this.initForm()
    this.selectform = new FormGroup({
      selectedAct: new FormControl(this.selectedAct, Validators.required),
      selectedStudent: new FormControl(this.selectedStudent, Validators.required),
      schools: new FormControl(this.selectedSchool, Validators.required),
      username: new FormControl("", Validators.required)
    })
    this.getKidSchools ()
    this.getClasses()
    this.explore()
    this.getGoals()
    this.kidsInventoryList()
    // this.activityGroup()
  }
  private initForm() {
    this.uploadform = new FormGroup({
      // username: new FormControl(this.ratingdata.username, [
      //   Validators.required
      // ]),
      video: new FormControl(""),
      url: new FormControl(this.ratingdata.url),
      rating: new FormControl(this.ratingdata.rating, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0),
        Validators.max(100)
      ]),
      comments: new FormControl(this.ratingdata.comments, [
        Validators.required
      ])
      },
      { validators: identityRevealedValidator }
    );
	}
    kidsInventoryList() {
      this.manage.kidsInventoryList().subscribe((response: any) => {
        if(response.success == true) {
          this.inventorList = response.kids_inventors
          console.log('aksllajkaskl',this.inventorList);
        }
      });
  }
  getKidSchools () {
    this.manage.getKidSchools().subscribe((response: any) => {
      console.log('getSchools', response);
      if(response.success) {
        this.selectedSchool = response.schools
      }
    });
  }
  getClasses () {
    this.manage.getClasses().subscribe((response: any) => {
      console.log('getClasses', response);
      if(response.success) {
        this.classes = response.class
      }
    });
  }
  getStudents (sid : string, classid : string) {
    this.schoolName = sid,
    this.manage.studentBySchool(sid, classid).subscribe((response: any) => {
      console.log('getStudents', response);
      if(response.success) {
        this.studentlist = response.kids
        console.log('asjhajkhjkasdjhkasjkd',   this.studentlist);
        console.log(this.selectedKid);

      }
    });
  }

  explore () {
    this.manage.exploreList().subscribe((response: any) => {
      console.log('getCurriculum', response);
      if(response.success) {
        this.expList = response.explore
        console.log(this.expList);
      }
    });
  }


  getSubjects (id : string) {
    this.classId = id
    this.manage.getSubjects(id).subscribe((response: any) => {
      console.log('getSubjects', response);
      if(response.success) {
        // this.subjects = response.subject
      }
    });
  }
  activityGroup (Inv_id : any, stu_id: any) {
    if(stu_id == '' || Inv_id == '') {
      return
    }
    var stuInd = this.studentlist.findIndex((x) => x['id'] == stu_id )
    if(stuInd != -1) {
      var kid_grp_id = this.studentlist[stuInd]['group_id']
      this.manage.activityGroup(Inv_id, kid_grp_id).subscribe((response: any) => {
        console.log('getSubjects', response);
        if(response.success == true) {
          this.activitygroupList = response.activity_group
          console.log(this.activitygroupList);
        }
      });
    }
  }
  getActivities (id : any) {
    this.manage.getGroupActivities(id).subscribe((response: any) => {
      console.log('getGroupActivities', response);
      if(response.success) {
        this.activitylist = response.activity_list
      }
    });
  }
  getFileDetails(e : any) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }
  uploadFiles() {
    const frmData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("video", this.myFiles[i]);
    }
  }
  getGoals () {
    this.manage.getGoals().subscribe((response: any) => {
      console.log('getGoals', response);
      this.goalslist = response.goal

    });
  }
  uploadVideo () {
    this.ngxService.start();

    console.log('classId selectedStudent', this.selectform.value)
    if(this.uploadform.value.rating == '') {
      this.errorShow = "Please enter the Activity name."
    } else if (this.uploadform.value.comments == '') {
      this.errorShow = "Please enter the Atoms."
    } else {
      // var ratingdata = {
      //   // url : this.uploadform.value.url,
      //   video: this.myFiles[0],
      //   user_id: this.selectform.value.selectedStudent,
      //   activity_id: this.selectform.value.selectedAct,
      //   goal_id: "" ,
      //   rating: this.uploadform.value.rating,
      //   comments : this.uploadform.value.comments
      // }
      console.log('this.myFiles ',this.myFiles);
      const formdata = new FormData();
    formdata.append('kid_id', this.studentid);
    formdata.append('activity_id', this.activityID);
    formdata.append('activity_group_id', this.activity_grp);
    formdata.append('kids_inventor_id', this.selectExplore);
    formdata.append('rating', this.uploadform.value.rating);
    formdata.append('comments', this.uploadform.value.comments);
    formdata.append('url', this.uploadform.value.url);
    // formdata.append('video', this.myFiles[0] );
    for (var i = 0; i < this.myFiles.length; i++) {
      formdata.append('files', this.myFiles[i]);
    }
    // var formData = new FormData()
      this.manage.uploadVideoParent(formdata).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          setTimeout(() => {
            this.ngxService.stop();
            this.uploadform.reset();
            this.selectform.reset();
            // stop foreground spinner of the master loader with 'default' taskId
          });
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")

          // this.getActivities ()
        } else {
          this.ngxService.stop();
          this.closebutton.nativeElement.click();
          this.notifyService.showError(response.msg, "")
        }
      });
    }
  }
}
