import { Injectable, signal } from '@angular/core';
import { Rule } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private customRules = signal<Rule[]>([]);

  constructor() {
    this.loadRules();
  }

  
  getRules() {
    return this.customRules.asReadonly();
  }

  
  saveRules(rules: Rule[]) {
    this.customRules.set(rules);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bikeConfiguratorRules', JSON.stringify(rules));
    }
  }

  private getDefaultRules(): Rule[] {
    return [
      {
        id: 'default-1',
        type: 'wheel-frame',
        description: 'Diamond frame cannot use mountain or fat bike wheels',
        condition: {
          if: { component: 'frameType', value: 'diamond' },
          then: { component: 'wheels', incompatible: ['mountain', 'fat-bike'] }
        }
      },
      {
        id: 'default-2',
        type: 'wheel-frame',
        description: 'Step-through frame cannot use mountain or fat bike wheels',
        condition: {
          if: { component: 'frameType', value: 'step-through' },
          then: { component: 'wheels', incompatible: ['mountain', 'fat-bike'] }
        }
      },
      {
        id: 'default-3',
        type: 'rim-wheel',
        description: 'Fat bike wheels cannot have red rims',
        condition: {
          if: { component: 'wheels', value: 'fat-bike' },
          then: { component: 'rimColor', incompatible: ['red'] }
        }
      }
    ];
  }

  private loadRules() {
    if (typeof localStorage === 'undefined') return;
    const saved = localStorage.getItem('bikeConfiguratorRules');
    if (saved) {
      try {
        this.customRules.set(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load rules:', e);
      }
    } else {
      const defaults = this.getDefaultRules();
      this.saveRules(defaults);
    }
  }

  
  isWheelCompatible(frameType: string, wheelType: string): boolean {
    const applicableRules = this.customRules().filter(
      r => r.type === 'wheel-frame' && r.condition.if.value === frameType
    );

    for (const rule of applicableRules) {
      if (rule.condition.then.incompatible.includes(wheelType)) {
        return false;
      }
    }

    return true;
  }

  
  isRimColorCompatible(wheels: string, rimColor: string): boolean {
    const applicableRules = this.customRules().filter(
      r => r.type === 'rim-wheel' && r.condition.if.value === wheels
    );

    for (const rule of applicableRules) {
      if (rule.condition.then.incompatible.includes(rimColor)) {
        return false;
      }
    }

    return true;
  }

  
  isChainCompatible(wheels: string, chain: string): boolean {
    const applicableRules = this.customRules().filter(
      r => r.type === 'chain-wheel' && r.condition.if.value === wheels
    );

    for (const rule of applicableRules) {
      if (rule.condition.then.incompatible.includes(chain)) {
        return false;
      }
    }

    return true;
  }
}
