import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import {Router} from '@angular/router';
import { ManageServiceService } from '../../manage-service.service';
import { NotificationService } from '../../../../notification.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {PaginationInstance} from 'ngx-pagination';
import { delay, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css','../dashboard-layout/dashboard-layout.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent implements OnInit {
  activitylist = []
  chapters = []
  subjects = []
  classes = []
  allSubjects = []
  allChapter = []
  activityName = ''
  atoms = ''
  url = ''
  o2 = ''
  classId = ''
  o2Id  = ''
  subId = ''
  chapterId = ''
  errorShow = ''
  createActivityform!: FormGroup
  searchform!: FormGroup
  search:any = ''
  filteredList:any = []
  filter=''
  myChapterFilter:any = []
  myStandardFilter:any = []
  selectedPagelist:any = []
  page: Number = 1;
  collection:any = []
  pages:any = []
  pagenumber:number = 1
  pagesize:any = '20'
  pageOfItems:any = [1]
  recordcount: string = '';
  id= 'basicPaginate';
  currentPage:number = 1;
  totalItems= this.recordcount
  directionLinks: boolean = true;

  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
};

  @ViewChild('closebutton') closebutton : any;
  @ViewChild('close') close : any;
  constructor(
    private route:Router,
    private manage: ManageServiceService,
    private notifyService : NotificationService,
    private fb: FormBuilder
    ) {

    }

  ngOnInit(): void {
    this.searchform = new FormGroup({
      search: new FormControl(this.search)
    })
    this.createActivityform = new FormGroup({
      activity_name: new FormControl("", Validators.required),
      atoms: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      o2: new FormControl("")
    })
    this.searchGoal(1)
    // this.getActivities()
    this.getClasses()
    this.getAllSubjects()
    this.getAllChapters()
  }
  setData(data : any) {
    console.log(data);

  }
  gotoGoals () {
    this.route.navigate(['/admin_goals']);
  }
  gotoVdoRating () {
    this.route.navigate(['/video_rating']);
  }
  gotoDashboard () {
    this.route.navigate(['/admin_dashboard']);
  }
  gotoActivity () {
    this.route.navigate(['/admin_activity']);
  }
  getActivities () {
    this.manage.getActivity().subscribe((response: any) => {
      console.log('getActivity', response);
      if(response.success) {
        this.activitylist = response.activity
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
  getAllSubjects () {
    this.manage.getAllSubjects().subscribe((response: any) => {
      console.log('getClasses', response);
      if(response.success) {
        this.allSubjects = response.subject
      }
    });
  }
  getAllChapters () {
    this.manage.getAllChapters().subscribe((response: any) => {
      console.log('getClasses', response);
      if(response.success) {
        this.allChapter = response.chapter
      }
    });
  }

  getSubjects (id : string) {
    this.classId = id
    console.log('myid',id);
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
  createActivity () {
    console.log('classId', this.classId)
    if(this.createActivityform.value.activity_name == '') {
      this.errorShow = "Please enter the Activity name."
    } else if (this.createActivityform.value.atoms == '') {
      this.errorShow = "Please enter the Atoms."
    } else if (this.createActivityform.value.url == '') {
      this.errorShow = "Please enter the Url."
    } else if (this.classId == '') {
      this.errorShow = "Please select the Class."
    } else if (this.subId == '') {
      this.errorShow = "Please select the Subject."
    } else if (this.chapterId == '') {
      this.errorShow = "Please select the Chapter."
    } else if (this.createActivityform.value.o2 == '') {
      this.errorShow = "Please enter values between 0 to 10."
    } else {
      var data = {
        activity_name : this.createActivityform.value.activity_name,
        atoms : this.createActivityform.value.atoms,
        url : this.createActivityform.value.url,
        class_id : this.classId,
        o2 : this.createActivityform.value.o2,
        subject_id : this.subId,
        chapter_id : this.chapterId
      }
      this.manage.createActivity(data).subscribe((response: any) => {
        console.log(response);
        if (response.success == true) {
          this.closebutton.nativeElement.click();
          this.notifyService.showSuccess(response.msg, "")
          this.getActivities ()
        }
      });
    }
  }
  onKey(event:any) {
    console.log("search", this.searchform.value.search);
    if(this.searchform.value.search.length == 0) {
      this.getActivities()
    }
          }
  searchGoal(page: number) {
    var data = {
      search : this.searchform.value.search,
      page_number: page,
      page_size: this.pagesize
    }
    console.log(page);
    console.log(data);
    this.manage.search( data).subscribe((res: any)=>{
      if(res.success) {
        this.filteredList = res.activity
          this.activitylist = this.filteredList
          this.recordcount = res.count
          this.currentPage = page;
          console.log(this.recordcount);

        console.log(this.filteredList);
      }
    })
  }
  filterbyStandard(id:string) {
    console.log(id);
    this.manage.filterbyStandard(id).subscribe((res: any)=>{
      if(res.success == true) {
        this.close.nativeElement.click();
        this.myStandardFilter = res.activity
        this.activitylist = this.myStandardFilter
        console.log('standardfill',this.myStandardFilter);
      }
    })
  }
  filterbyChapter(cid:string) {
    // this.classId = id
    console.log(cid);
    this.manage.filterbyChapter(cid).subscribe((res: any)=>{
      console.log("chapterfill",res);
      if(res.success == true) {
        this.close.nativeElement.click();
        this.myChapterFilter = res.activity
        this.activitylist = this.myChapterFilter
      }
      console.log("myChapterFilter",this.myChapterFilter);
      console.log("askldakldjkasjkl",this.filter);

    })
  }
  formempty() {
  }
}
