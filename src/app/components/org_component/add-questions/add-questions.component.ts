import { Component, OnInit } from '@angular/core';
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
  answer : boolean = false
  constructor(
    private route:Router,
    private org: OrgServiceService,
    private notifyService: NotificationService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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
  toggleAns() {
    this.answer = !this.answer
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
    if(this.question == '' && this.myQuesFile.length == 0) {
      this.errorShow = "Please Enter the Question"
      return
    }
    var formData = new FormData();
    formData.append('name', this.question)
    formData.append('level', this.level)
    if(this.myQuesFile.length != 0) {
      formData.append('image', this.myQuesFile[0])
    }
    this.org.addQuestion(formData).subscribe((response: any) => {
      this.errorShow = ""
      if (response.success === true) {
        console.log('response ', response);
        this.quesPreview = {}
        this.questionId = response.question.id
        this.quesPreview['question'] = this.question
        this.quesPreview['option'] = []
        this.quesPreview['questionUrl'] = this.QuesUrl
        this.notifyService.showSuccess(response.msg, '');
      } else {
        this.notifyService.showError(response.msg, '');
      }
    })
  }

}
