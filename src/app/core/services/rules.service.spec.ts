import { TestBed } from '@angular/core/testing';
import { RulesService } from './rules.service';
import { Rule } from '../models/interfaces';

describe('RulesService', () => {
  let service: RulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesService);
    service.saveRules([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty rules initially', () => {
    const rules = service.getRules()();
    expect(rules).toEqual([]);
  });

  it('should save and retrieve rules', () => {
    const rules: Rule[] = [{
      id: '1',
      type: 'wheel-frame',
      description: 'Test rule',
      condition: {
        if: { component: 'frameType', value: 'full-suspension' },
        then: { component: 'wheels', incompatible: ['road'] }
      }
    }];
    service.saveRules(rules);
    expect(service.getRules()()).toEqual(rules);
  });

  it('should return compatible when no rules apply', () => {
    expect(service.isWheelCompatible('diamond', 'road')).toBeTrue();
    expect(service.isRimColorCompatible('road', 'red')).toBeTrue();
    expect(service.isChainCompatible('road', '8-speed')).toBeTrue();
  });

  it('should detect incompatible wheel-frame combination', () => {
    const rules: Rule[] = [{
      id: '1',
      type: 'wheel-frame',
      description: 'Full-suspension cannot use road wheels',
      condition: {
        if: { component: 'frameType', value: 'full-suspension' },
        then: { component: 'wheels', incompatible: ['road'] }
      }
    }];
    service.saveRules(rules);
    expect(service.isWheelCompatible('full-suspension', 'road')).toBeFalse();
    expect(service.isWheelCompatible('full-suspension', 'mountain')).toBeTrue();
    expect(service.isWheelCompatible('diamond', 'road')).toBeTrue();
  });

  it('should detect incompatible rim-wheel combination', () => {
    const rules: Rule[] = [{
      id: '2',
      type: 'rim-wheel',
      description: 'Road wheels cannot have red rims',
      condition: {
        if: { component: 'wheels', value: 'road' },
        then: { component: 'rimColor', incompatible: ['red'] }
      }
    }];
    service.saveRules(rules);
    expect(service.isRimColorCompatible('road', 'red')).toBeFalse();
    expect(service.isRimColorCompatible('road', 'black')).toBeTrue();
    expect(service.isRimColorCompatible('mountain', 'red')).toBeTrue();
  });

  it('should detect incompatible chain-wheel combination', () => {
    const rules: Rule[] = [{
      id: '3',
      type: 'chain-wheel',
      description: 'Fat bike cannot use single-speed chain',
      condition: {
        if: { component: 'wheels', value: 'fat-bike' },
        then: { component: 'chain', incompatible: ['single-speed'] }
      }
    }];
    service.saveRules(rules);
    expect(service.isChainCompatible('fat-bike', 'single-speed')).toBeFalse();
    expect(service.isChainCompatible('fat-bike', '8-speed')).toBeTrue();
    expect(service.isChainCompatible('road', 'single-speed')).toBeTrue();
  });
});
