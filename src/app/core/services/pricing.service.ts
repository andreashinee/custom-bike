import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PricingService {
  readonly BASE_PRICE = 0;

  private frameTypePrices = {
    'full-suspension': 130,
    'diamond': 100,
    'step-through': 90,
  };

  private frameFinishPrices: Record<string, Record<string, number>> = {
    'full-suspension': { matte: 30, shiny: 50 },
    'diamond': { matte: 25, shiny: 40 },
    'step-through': { matte: 20, shiny: 35 },
  };

  private wheelsPrices = {
    'road': 80,
    'mountain': 120,
    'fat-bike': 150,
  };

  private rimColorPrices: Record<string, Record<string, number>> = {
    'road': { red: 15, black: 10, blue: 20 },
    'mountain': { red: 20, black: 15, blue: 25 },
    'fat-bike': { red: 0, black: 25, blue: 30 },
  };

  private chainPrices = {
    'single-speed': 43,
    '8-speed': 85,
  };

  
  getFrameTypePrice(frameType: string): number {
    return this.frameTypePrices[frameType as keyof typeof this.frameTypePrices] || 0;
  }

  
  getFrameFinishPrice(frameType: string, finish: string): number {
    return this.frameFinishPrices[frameType]?.[finish] || 0;
  }

  
  getWheelsPrice(wheels: string): number {
    return this.wheelsPrices[wheels as keyof typeof this.wheelsPrices] || 0;
  }

  
  getRimColorPrice(wheels: string, color: string): number {
    return this.rimColorPrices[wheels]?.[color] || 0;
  }

  
  getChainPrice(chain: string): number {
    return this.chainPrices[chain as keyof typeof this.chainPrices] || 0;
  }
}
