import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { identityRevealedValidator } from '../../../../shared/identity-revealed.directive';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css', '../dashboard-layout/dashboard-layout.component.css']
})
export class VideoUploadComponent implements OnInit {
  activitylist = []
  selectedAct = []
  selectform!: FormGroup
  myFiles: string[] = [];
  selectedSchool = []
  selectedStudent = []
  schoollist = []
  studentlist = []
  expList = []
  classes = []
  students = []
  curriculum = []
  subjects = []
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
  ratingdata = { username: '', atoms_scored: '',url:  '',
  comments: ''}
  vdolist = [
    { id : "1", name : "Harini", class: "7", school: "Chem Roast", date : "06-09-2022", activity_name : 'Activity name1', score: '29', profile : '' },
    // { id : "2", name : "Jayaharini T", class: "12", school: "Chem Roast ijk uh", date : "16-09-2022", activity_name : 'Activity name2', score: 'New', profile : '' },
    // { id : "3", name : "Deepika", class: "3", school: "Chem Roast da", date : "08-09-2022", activity_name : 'Activity name3', score: '29', profile : '' },
  ]
  @ViewChild('closebutton') closebutton : any;

  constructor(private route:Router,
    private fb: FormBuilder,
    private manage: ManageServiceService,
    private notifyService : NotificationService,public datepipe: DatePipe, private ngxService : NgxUiLoaderService) { }

  // get username() { return this.uploadform.get('username')!; }
  get atoms_scored() { return this.uploadform.get('atoms_scored')!; }
  get comments() { return this.uploadform.get('comments')!; }
  get files() { return this.uploadform.get('files')!; }
  get url() { return this.uploadform.get('url')!; }


  ngOnInit(): void {
    // this.loader= true;
    // this.ngxService.start();
    // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s

    // this.ngxService.stopLoader("loader-01");
    // this.ngxService.startLoader("loader-01");

    this.initForm()
    this.selectform = new FormGroup({
      selectedAct: new FormControl(this.selectedAct, Validators.required),
      selectedStudent: new FormControl(this.selectedStudent, Validators.required),
      schools: new FormControl(this.selectedSchool, Validators.required),
      username: new FormControl("", Validators.required)
    })
    this.getSchools ()

    this.getClasses()
    this.explore()
    this.getGoals()
    // search student
    // $(document).ready(function(){
    //   $("#myInput").on("keyup", function() {
    //     var value = $(this).val().toLowerCase();
    //     $("#myTable tr").filter(function() {
    //       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //     });
    //   });
    // });
  }

  private initForm() {
    this.uploadform = new FormGroup({
      // username: new FormControl(this.ratingdata.username, [
      //   Validators.required
      // ]),
      files: new FormControl(""),
      url: new FormControl(this.ratingdata.url),
      atoms_scored: new FormControl(this.ratingdata.atoms_scored, [
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

  getSchools () {
    this.manage.getSchools().subscribe((response: any) => {
      console.log('getSchools', response);
      if(response.success) {
        this.selectedSchool = response.school_name
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
    this.manage.getStudents(sid, classid).subscribe((response: any) => {
      console.log('getStudents', response);
      if(response.success) {
        this.studentlist = response.student
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
        this.subjects = response.subject
      }
    });
  }
  getChapter (id : string) {
    this.subId = id
    this.manage.getChapter(id).subscribe((response: any) => {
      console.log('getSubjects', response);
      if(response.success) {
        this.chapters = response.chapter
      }
    });
  }
  getActivities (id : any) {
    this.chapterId = id
    this.manage.getAdminActivity(this.chapterId).subscribe((response: any) => {
      console.log('getAdminActivity', response);
      if(response.success) {
        this.activitylist = response.activity
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
      frmData.append("files", this.myFiles[i]);
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
    if(this.uploadform.value.atoms_scored == '') {
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
      //   atoms_scored: this.uploadform.value.atoms_scored,
      //   comments : this.uploadform.value.comments
      // }
      console.log('this.myFiles ',this.myFiles);
      const formdata = new FormData();
    formdata.append('user_id', this.selectform.value.selectedStudent);
    formdata.append('activity_id', this.selectform.value.selectedAct);
    formdata.append('atoms_scored', this.uploadform.value.atoms_scored);
    formdata.append('comments', this.uploadform.value.comments);
    formdata.append('url', this.uploadform.value.url);
    formdata.append('goal_id',this.goal_Id );
    formdata.append('files', this.myFiles[0] );
    // var formData = new FormData()
      this.manage.uploadVideo(formdata).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          setTimeout(() => {
            this.ngxService.stop();
            // stop foreground spinner of the master loader with 'default' taskId
          });
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")

          // this.getActivities ()
        }
      });
    }
  }
}
