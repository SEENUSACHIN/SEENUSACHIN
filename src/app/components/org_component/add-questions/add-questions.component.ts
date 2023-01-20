import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { OrgServiceService } from '../org-service.service';
import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';
import { identityRevealedValidator } from '../../../shared/identity-revealed.directive';
import { UniqueAlterEgoValidator } from '../../../shared/alter-ego.directive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../notification.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css', '../question-repository/question-repository.component.css']
})
export class AddQuestionsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  session_id: any
  myQuesFile : any[] = [];
  myAnsFile1 : any[] = [];
  myAnsFile2 : any[] = [];
  myAnsFile3 : any[] = [];
  myAnsFile4 : any[] = [];
  QuesUrl : any
  AnsUrl1 : any
  AnsUrl2 : any
  AnsUrl3 : any
  AnsUrl4 : any
  quesPreview : any
  question : string = ''
  level : string = 'beginner'
  option1 : string = ''
  option2 : string = ''
  option3 : string = ''
  option4 : string = ''
  errorShow = ''
  questionId = ''
  categoryList : any
  category : string = ''
  newCategory : string = ''
  answer : string = 'a'
  crt_ans = 0
  @ViewChild('closebutton') closebutton : any;
  addCategory = false
  constructor(
    private routeP: ActivatedRoute,
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.session_id =this.routeP.snapshot.paramMap.get('session_id')
    console.log("sessionId123123 ", this.session_id);
    this.getCategory()
  }

  getQuesFileDetails(e: any) {
    console.log (e.target.files);
    for (var j = 0; j < e.target.files.length; j++) {
      this.myQuesFile.push(e.target.files[j]);
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[j]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.QuesUrl = event.target.result;
      }
    }
    console.log('this.myQuesFile ', this.myQuesFile[0].type);
  }
  removeQuesFile() {
    this.myQuesFile = []
  }
  removeAnsFile1() {
    this.myAnsFile1 = []
  }
  removeAnsFile2() {
    this.myAnsFile2 = []
  }
  removeAnsFile3() {
    this.myAnsFile3 = []
  }
  removeAnsFile4() {
    this.myAnsFile4 = []
  }
  loadQues() {
    this.newItemEvent.emit(false);
  }
  getAnsFileDetails1(e: any) {
    console.log (e.target.files);
    for (var j = 0; j < e.target.files.length; j++) {
      this.myAnsFile1.push(e.target.files[j]);
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[j]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.AnsUrl1 = event.target.result;
      }
    }
    console.log('this.myAnsFile ', this.myAnsFile1[0]);
  }
  getAnsFileDetails2(e: any) {
    console.log (e.target.files);
    for (var j = 0; j < e.target.files.length; j++) {
      this.myAnsFile2.push(e.target.files[j]);
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[j]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.AnsUrl2 = event.target.result;
      }
    }
    console.log('this.myAnsFile ', this.myAnsFile2[0]);
  }
  getAnsFileDetails3(e: any) {
    console.log (e.target.files);
    for (var j = 0; j < e.target.files.length; j++) {
      this.myAnsFile3.push(e.target.files[j]);
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[j]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.AnsUrl3 = event.target.result;
      }
    }
    console.log('this.myAnsFile ', this.myAnsFile3[0]);
  }
  getAnsFileDetails4(e: any) {
    console.log (e.target.files);
    for (var j = 0; j < e.target.files.length; j++) {
      this.myAnsFile4.push(e.target.files[j]);
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[j]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.AnsUrl4 = event.target.result;
      }
    }
    console.log('this.myAnsFile ', this.myAnsFile4[0]);
  }
  addOption() {
    // console.log("option ", this.option);
    // console.log("myAnsFile ", this.myAnsFile);
    // console.log("answer ", this.answer);
    // console.log("questionId ", this.questionId);
    // if(this.option == '' && this.myAnsFile.length == 0) {
    //   this.errorShow = "Please Enter the Option"
    //   return
    // }
    // var formData = new FormData();
    // formData.append('name', this.option)
    // formData.append('answer', this.answer.toString())
    // if(this.myAnsFile.length != 0) {
    //   formData.append('image', this.myAnsFile[0])
    // }
    // this.org.addOption(formData, this.questionId).subscribe((response: any) => {
    //   this.errorShow = ""
    //   if (response.success === true) {
    //     console.log('response ', response);
    //     var optData = {
    //       optionName : this.option,
    //       ansUrl : this.AnsUrl,
    //       crtAns : this.answer
    //     }
    //     this.quesPreview['option'].push(optData)
    //     console.log('this.quesPreview 1 ', this.quesPreview);
    //     this.notifyService.showSuccess(response.msg, '');
    //     this.option = ''
    //     this.AnsUrl = null
    //     this.myAnsFile = []
    //     this.answer = false
    //   } else {
    //     this.notifyService.showError(response.msg, '');
    //   }
    // })
  }
  addQues() {
    // if(this.question == '' && this.myQuesFile.length == 0) {
    //   this.errorShow = "Please Enter the Question"
    //   return
    // }
    console.log('this.category ', this.category);
    const formData = new FormData();
    formData.append('question', this.question)
    console.log('formData question ', formData.getAll('question'));
    formData.append('level', this.level)
    console.log('formData level ', formData.getAll('level'));
    formData.append('a', this.option1)
    formData.append('b', this.option2)
    formData.append('c', this.option3)
    formData.append('d', this.option4)
    console.log('formData a ', formData.getAll('a'));
    console.log('formData b ', formData.getAll('b'));
    console.log('formData c ', formData.getAll('c'));
    console.log('formData d ', formData.getAll('d'));
    formData.append('category_id', this.category)
    formData.append('category', this.newCategory)
    formData.append('answer', this.answer)
    console.log('formData answer ', formData.getAll('answer'));

    if(this.myQuesFile.length != 0) {
      formData.append('questionFile', this.myQuesFile[0])
    }
    console.log('formData question ', formData.getAll('questionFile'));

    console.log('formData this.myAnsFile1 ', this.myAnsFile1);
    console.log('formData this.myAnsFile2 ', this.myAnsFile2);
    console.log('formData this.myAnsFile3 ', this.myAnsFile3);
    console.log('formData this.myAnsFile4 ', this.myAnsFile4);

    var optionFiles = []
    if(this.myAnsFile1.length != 0) {
      optionFiles.push(this.myAnsFile1[0])
    }
    if (this.myAnsFile1.length != 0 &&  this.answer == 'a') {
      formData.append('ans', this.myAnsFile1[0])
    }
    if (this.myAnsFile1.length == 0) {
      optionFiles.push("")
    }
    if(this.myAnsFile2.length != 0) {
      optionFiles.push(this.myAnsFile2[0])
    }
    if (this.myAnsFile2.length != 0 &&  this.answer == 'b') {
    }
    if(this.myAnsFile2.length == 0) {
      optionFiles.push("")
    }
    if(this.myAnsFile3.length != 0) {
      optionFiles.push(this.myAnsFile3[0])
    }
    if (this.myAnsFile3.length != 0 &&  this.answer == 'c') {
      formData.append('ans', this.myAnsFile3[0])
    }
    if (this.myAnsFile3.length == 0) {
      optionFiles.push("")
    }
    if(this.myAnsFile4.length != 0) {
      optionFiles.push(this.myAnsFile4[0])
    }
    if (this.myAnsFile4.length != 0 &&  this.answer == 'd') {
      formData.append('ans', this.myAnsFile4[0])
    }
    if (this.myAnsFile4.length == 0) {
      optionFiles.push("")
    }
    console.log('formData optionFiles ', optionFiles);
    for (let i = 0; i < optionFiles.length; i++) {
      if(optionFiles[i] != '') {
        formData.append('option'+ (i+1) , optionFiles[i])
      }
    }
    // formData.append('option',  JSON.stringify(optionFiles))
    console.log('formData option1 ', formData.getAll('option'));
    console.log('formData ans ', formData.getAll('ans'));

    console.log('formData ', formData);
    this.org.addQuestionWithOption(formData).subscribe((response: any) => {
      this.errorShow = ""
      if (response.success === true) {
        console.log('responsequest----- ', response);
        var sessionData = {
          question_id: response.question_id
        };
        this.org.addQuestiontoSession(sessionData, this.session_id).subscribe((response1: any) => {
          this.errorShow = ""
          if (response1.success === true) {
            this.notifyService.showSuccess(response1.msg, '');
          } else {
            this.notifyService.showError(response1.msg, '');
          }
          this.closebutton.nativeElement.click();
        })
        // this.notifyService.showSuccess(response.msg, '');
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })
  }

  getCategory() {
    this.org.getCategories().subscribe((response: any) => {
      if (response.success === true) {
        this.categoryList = response.category
      }
    })
  }
  addCetegoryList() {
    this.org.addCategories(this.newCategory).subscribe((response: any) => {
      if (response.success === true) {
        this.addCategory = false;
        this.getCategory()
        this.category = this.newCategory
      }
    })
  }
  onselectCategory(e: any) {
    console.log('event ', e);
    console.log('category ', this.category);
  }

}
