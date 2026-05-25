import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { HeaderComponent } from '@components/common/header/header';
import { RulesEditorComponent } from '@components/rules-manager/rules-editor/rules-editor';
import { RulesListComponent } from '@components/rules-manager/rules-list/rules-list';
import { Rule } from '@models/interfaces';
import { RulesService } from '@services/rules.service';

@Component({
  selector: 'app-rules-manager',
  standalone: true,
  imports: [Button, HeaderComponent, RulesEditorComponent, RulesListComponent],
  templateUrl: './rules-manager.html',
  styleUrl: './rules-manager.scss'
})
export class RulesManagerComponent implements OnInit {
  rules: Rule[] = [];

  constructor(
    private rulesService: RulesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRules();
  }

  loadRules() {
    this.rules = this.rulesService.getRules()();
  }

  onRuleAdded() {
    this.loadRules();
  }

  onDeleteRule(ruleId: string) {
    this.rules = this.rules.filter(r => r.id !== ruleId);
    this.rulesService.saveRules(this.rules);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
