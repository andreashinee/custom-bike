import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { AutoComplete } from 'primeng/autocomplete';
import { Rule } from '@models/interfaces';
import { RulesService } from '@services/rules.service';
import { ComponentOption, ruleTypes, frameTypes, wheelTypes, rimColors, chainTypes, descriptionLabels, componentMap, getConditionOptions, getIncompatibleOptions } from '@config/rule-options';

@Component({
  selector: 'app-rules-editor',
  standalone: true,
  imports: [FormsModule, Button, AutoComplete],
  templateUrl: './rules-editor.html',
  styleUrl: './rules-editor.scss'
})
export class RulesEditorComponent {
  @Output() ruleAdded = new EventEmitter<void>();

  showForm: boolean = false;

  ruleTypes = ruleTypes;
  frameTypes = frameTypes;
  wheelTypes = wheelTypes;
  rimColors = rimColors;
  chainTypes = chainTypes;

  filteredRuleTypeOptions: ComponentOption[] = [];
  filteredConditionOptions: ComponentOption[] = [];
  filteredIncompatibleOptions: ComponentOption[] = [];

  _selectedRuleType: string | null = null;
  selectedCondition: string = '';
  selectedIncompatible: string = '';

  get selectedRuleType(): string | null {
    return this._selectedRuleType;
  }

  set selectedRuleType(value: string | null) {
    this._selectedRuleType = value;
    this.selectedCondition = '';
    this.selectedIncompatible = '';
    this.filteredConditionOptions = [...this.conditionOptions];
    this.filteredIncompatibleOptions = [...this.incompatibleOptions];
  }

  get conditionOptions(): ComponentOption[] {
    return getConditionOptions(this.selectedRuleType);
  }

  get incompatibleOptions(): ComponentOption[] {
    return getIncompatibleOptions(this.selectedRuleType);
  }

  get autoDescription(): string {
    if (!this.selectedRuleType || !this.selectedCondition || !this.selectedIncompatible) return '';
    const c = descriptionLabels[this.selectedRuleType];
    const cl = (this.conditionOptions.find(o => o.value === this.selectedCondition)?.label || this.selectedCondition).toUpperCase();
    const il = (this.incompatibleOptions.find(o => o.value === this.selectedIncompatible)?.label || this.selectedIncompatible).toUpperCase();
    return `${c.if} ${cl} 🚫 ${c.then} ${il}`;
  }

  get canSubmit(): boolean {
    return !!(this.selectedRuleType && this.selectedCondition && this.selectedIncompatible);
  }

  constructor(private rulesService: RulesService) {}

  onAddClick() {
    this.showForm = true;
    this.filteredRuleTypeOptions = [...this.ruleTypes];
  }

  onCancel() {
    this.resetForm();
    this.showForm = false;
  }

  onSubmit() {
    if (!this.canSubmit) return;
    const components = componentMap[this.selectedRuleType!];
    const newRule: Rule = {
      id: `custom-${Date.now()}`,
      type: this.selectedRuleType as 'wheel-frame' | 'rim-wheel' | 'chain-wheel',
      description: this.autoDescription,
      condition: {
        if: { component: components.if, value: this.selectedCondition },
        then: { component: components.then, incompatible: [this.selectedIncompatible] }
      }
    };
    const currentRules = this.rulesService.getRules()();
    this.rulesService.saveRules([...currentRules, newRule]);
    this.resetForm();
    this.showForm = false;
    this.ruleAdded.emit();
  }

  filterRuleTypeOptions(event: { query: string }) {
    this.filteredRuleTypeOptions = this.ruleTypes.filter(opt =>
      opt.label.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  filterConditionOptions(event: { query: string }) {
    this.filteredConditionOptions = this.conditionOptions.filter(opt =>
      opt.label.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  filterIncompatibleOptions(event: { query: string }) {
    this.filteredIncompatibleOptions = this.incompatibleOptions.filter(opt =>
      opt.label.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  resetForm() {
    this._selectedRuleType = null;
    this.selectedCondition = '';
    this.selectedIncompatible = '';
    this.filteredRuleTypeOptions = [];
    this.filteredConditionOptions = [];
    this.filteredIncompatibleOptions = [];
  }
}
