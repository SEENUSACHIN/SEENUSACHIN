import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant-game',
  templateUrl: './participant-game.component.html',
  styleUrls: ['./participant-game.component.css']
})
export class ParticipantGameComponent implements OnInit {

  questionObj : any =
    {
      ques : "Entomology is the science that studies",
      options : [
        "Behavior of human beings",
        "Insects",
        "The origin and history of technical and scientific terms",
        "The formation of rocks"
      ]
    }


  constructor() { }

  ngOnInit(): void {
  }

}
