import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';

import { ScreeningQuestionModel } from '../../../domain/models/screening-question.model';
import { ScreeningAnswerFormGroup } from '../../view-models/screening-form.model';
import { ScreeningQuestionCardComponent } from '../screening-question-card/screening-question-card.component';

@Component({
  selector: 'app-screening-question-list',
  imports: [ScreeningQuestionCardComponent],
  templateUrl: './screening-question-list.component.html',
  styleUrl: './screening-question-list.component.css'
})
export class ScreeningQuestionListComponent {
  @Input() questions: ScreeningQuestionModel[] = [];
  @Input({ required: true }) answers!: FormArray<ScreeningAnswerFormGroup>;
  @Input() language: 'ar' | 'en' | 'AR' | 'EN' = 'en';
  @Output() answerChange = new EventEmitter<{
    question: ScreeningQuestionModel;
    answer: boolean;
  }>();

  onAnswerChange(question: ScreeningQuestionModel, answer: boolean): void {
    this.answerChange.emit({
      question,
      answer
    });
  }
}
