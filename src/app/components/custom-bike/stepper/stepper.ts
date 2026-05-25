import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Step } from '@models/interfaces';


@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss'
})
export class StepperComponent {
  
  @Input() steps: Step[] = [];

  
  @Input() currentStep: number = 1;

  
  @Output() stepChange = new EventEmitter<number>();

  
  onStepClick(stepNumber: number) {
    if (stepNumber < this.currentStep) {
      this.stepChange.emit(stepNumber);
    }
  }

  
  isStepCompleted(stepNumber: number): boolean {
    return stepNumber < this.currentStep;
  }

  
  isStepActive(stepNumber: number): boolean {
    return stepNumber === this.currentStep;
  }
}
