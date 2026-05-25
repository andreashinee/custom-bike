import { TestBed } from '@angular/core/testing';
import { PricingService } from './pricing.service';

describe('PricingService', () => {
  let service: PricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return base price 0', () => {
    expect(service.BASE_PRICE).toBe(0);
  });

  describe('getFrameTypePrice', () => {
    it('should return correct prices for known frame types', () => {
      expect(service.getFrameTypePrice('full-suspension')).toBe(130);
      expect(service.getFrameTypePrice('diamond')).toBe(100);
      expect(service.getFrameTypePrice('step-through')).toBe(90);
    });

    it('should return 0 for unknown frame types', () => {
      expect(service.getFrameTypePrice('unknown')).toBe(0);
    });
  });

  describe('getFrameFinishPrice', () => {
    it('should return correct prices for full-suspension finishes', () => {
      expect(service.getFrameFinishPrice('full-suspension', 'matte')).toBe(30);
      expect(service.getFrameFinishPrice('full-suspension', 'shiny')).toBe(50);
    });

    it('should return correct prices for diamond finishes', () => {
      expect(service.getFrameFinishPrice('diamond', 'matte')).toBe(25);
      expect(service.getFrameFinishPrice('diamond', 'shiny')).toBe(40);
    });

    it('should return correct prices for step-through finishes', () => {
      expect(service.getFrameFinishPrice('step-through', 'matte')).toBe(20);
      expect(service.getFrameFinishPrice('step-through', 'shiny')).toBe(35);
    });

    it('should return 0 for unknown finish', () => {
      expect(service.getFrameFinishPrice('full-suspension', 'unknown')).toBe(0);
    });

    it('should return 0 for unknown frame type', () => {
      expect(service.getFrameFinishPrice('unknown', 'matte')).toBe(0);
    });
  });

  describe('getWheelsPrice', () => {
    it('should return correct prices for known wheel types', () => {
      expect(service.getWheelsPrice('road')).toBe(80);
      expect(service.getWheelsPrice('mountain')).toBe(120);
      expect(service.getWheelsPrice('fat-bike')).toBe(150);
    });

    it('should return 0 for unknown wheel type', () => {
      expect(service.getWheelsPrice('unknown')).toBe(0);
    });
  });

  describe('getRimColorPrice', () => {
    it('should return correct prices for road rims', () => {
      expect(service.getRimColorPrice('road', 'red')).toBe(15);
      expect(service.getRimColorPrice('road', 'black')).toBe(10);
      expect(service.getRimColorPrice('road', 'blue')).toBe(20);
    });

    it('should return correct prices for mountain rims', () => {
      expect(service.getRimColorPrice('mountain', 'red')).toBe(20);
      expect(service.getRimColorPrice('mountain', 'black')).toBe(15);
      expect(service.getRimColorPrice('mountain', 'blue')).toBe(25);
    });

    it('should return correct prices for fat-bike rims', () => {
      expect(service.getRimColorPrice('fat-bike', 'red')).toBe(0);
      expect(service.getRimColorPrice('fat-bike', 'black')).toBe(25);
      expect(service.getRimColorPrice('fat-bike', 'blue')).toBe(30);
    });

    it('should return 0 for unknown wheel type', () => {
      expect(service.getRimColorPrice('unknown', 'red')).toBe(0);
    });

    it('should return 0 for unknown color', () => {
      expect(service.getRimColorPrice('road', 'unknown')).toBe(0);
    });
  });

  describe('getChainPrice', () => {
    it('should return correct prices for known chain types', () => {
      expect(service.getChainPrice('single-speed')).toBe(43);
      expect(service.getChainPrice('8-speed')).toBe(85);
    });

    it('should return 0 for unknown chain type', () => {
      expect(service.getChainPrice('unknown')).toBe(0);
    });
  });
});
