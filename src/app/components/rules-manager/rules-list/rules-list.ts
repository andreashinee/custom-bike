import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Button } from 'primeng/button';
import { Rule } from '@models/interfaces';
import { ComponentOption, ruleTypeLabels, componentLabels, frameTypes, wheelTypes, rimColors, chainTypes, getOptionLabel as getOptLabel, getOptionLabels as getOptLabels } from '../../../config/rule-options';


@Component({
  selector: 'app-rules-list',
  standalone: true,
  imports: [Button],
  templateUrl: './rules-list.html',
  styleUrl: './rules-list.scss'
})
export class RulesListComponent {
  
  @Input() rules: Rule[] = [];

  
  @Output() deleteRule = new EventEmitter<string>();

  
  getRuleTypeLabel(type: string): string {
    return ruleTypeLabels[type] || type;
  }

  
  getComponentLabel(component: string): string {
    return componentLabels[component] || component;
  }

  
  getOptionLabel(component: string, value: string): string {
    return getOptLabel(component, value);
  }

  
  getOptionLabels(component: string, values: string[]): string {
    return getOptLabels(component, values);
  }

  
  getOptionInfo(component: string, value: string): ComponentOption | undefined {
    const map: Record<string, ComponentOption[]> = {
      frameType: frameTypes,
      wheels: wheelTypes,
      rimColor: rimColors,
      chain: chainTypes,
    };
    return map[component]?.find(o => o.value === value);
  }

  
  onDelete(ruleId: string) {
    this.deleteRule.emit(ruleId);
  }
}
