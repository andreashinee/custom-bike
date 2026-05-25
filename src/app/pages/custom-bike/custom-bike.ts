import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '@components/common/header/header';
import { BikePreviewComponent } from '@components/custom-bike/bike-preview/bike-preview';
import { StepperComponent } from '@components/custom-bike/stepper/stepper';
import { OptionCardComponent } from '@components/custom-bike/option-card/option-card';
import { PriceSummaryComponent } from '@components/custom-bike/price-summary/price-summary';
import { Button } from 'primeng/button';
import { ConfigSelection, Option, PriceDetail, SavedConfiguration } from '@models/interfaces';
import { PricingService } from '@services/pricing.service';
import { RulesService } from '@services/rules.service';
import { codeMap, defaultSelections, steps, frameTypes, frameFinishes, wheelTypes, rimColors, chainTypes } from '@config/bike-options';


@Component({
  selector: 'app-custom-bike',
  standalone: true,
  imports: [
    HeaderComponent,
    BikePreviewComponent,
    StepperComponent,
    OptionCardComponent,
    PriceSummaryComponent,
    Button,
    DatePipe
  ],
  templateUrl: './custom-bike.html',
  styleUrl: './custom-bike.scss'
})
export class CustomBikeComponent implements OnInit {
  currentStep: number = 1;
  presentationMode: boolean = false;
  savedConfigs: SavedConfiguration[] = [];

  get referenceCode(): string {
    const parts: string[] = [];
    for (const key of ['frameType', 'frameFinish', 'rimColor', 'chain'] as const) {
      const val = this.selections[key];
      parts.push(codeMap[key]?.[val] ?? val.toUpperCase());
    }
    return parts.join('-');
  }

  selections: ConfigSelection = { ...defaultSelections };

  steps = steps;

  frameTypes = frameTypes;
  frameFinishes = frameFinishes;
  wheelTypes = wheelTypes;
  rimColors = rimColors;
  chainTypes = chainTypes;

  constructor(
    private pricingService: PricingService,
    private rulesService: RulesService,
    private router: Router
  ) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('bikeConfiguratorSelections');
      if (saved) {
        try {
          this.selections = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to load selections:', e);
        }
      }

      const history = localStorage.getItem('bikeConfiguratorHistory');
      if (history) {
        try {
          this.savedConfigs = JSON.parse(history);
        } catch (e) {
          console.error('Failed to load history:', e);
        }
      }
    }
  }

  get isCurrentConfigSaved(): boolean {
    return this.savedConfigs.some(c => c.referenceCode === this.referenceCode);
  }

  saveCurrentConfig() {
    if (this.isCurrentConfigSaved) return;
    const config: SavedConfiguration = {
      name: `Config ${this.savedConfigs.length + 1}`,
      timestamp: Date.now(),
      selections: { ...this.selections },
      referenceCode: this.referenceCode,
      totalPrice: this.totalPrice
    };
    this.savedConfigs.unshift(config);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bikeConfiguratorHistory', JSON.stringify(this.savedConfigs));
    }
  }

  loadConfig(config: SavedConfiguration) {
    this.selections = { ...config.selections };
    this.saveSelections();
    this.currentStep = 6;
  }

  
  deleteConfig(index: number) {
    this.savedConfigs.splice(index, 1);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bikeConfiguratorHistory', JSON.stringify(this.savedConfigs));
    }
  }

  
  togglePresentation() {
    this.presentationMode = !this.presentationMode;
  }

  private saveSelections() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bikeConfiguratorSelections', JSON.stringify(this.selections));
    }
  }

  
  get currentOptions(): Option[] {
    switch (this.currentStep) {
      case 1:
        return this.frameTypes;
      case 2:
        return this.frameFinishes;
      case 3:
        return this.wheelTypes.map(w => ({
          ...w,
          disabled: !this.rulesService.isWheelCompatible(this.selections.frameType, w.id)
        }));
      case 4:
        return this.rimColors.map(c => ({
          ...c,
          disabled: !this.rulesService.isRimColorCompatible(this.selections.wheels, c.id)
        }));
      case 5:
        return this.chainTypes.map(c => ({
          ...c,
          disabled: !this.rulesService.isChainCompatible(this.selections.wheels, c.id)
        }));
      default:
        return [];
    }
  }

  
  get priceDetails(): PriceDetail[] {
    const allDetails = this.allPriceDetails;
    return allDetails.slice(0, this.currentStep);
  }

  
  get totalPrice(): number {
    return this.priceDetails.reduce((sum, detail) => sum + detail.price, 0);
  }

  get allPriceDetails(): PriceDetail[] {
    const details: PriceDetail[] = [];

    const frameTypeOption = this.frameTypes.find(f => f.id === this.selections.frameType);
    const frameTypePrice = this.pricingService.getFrameTypePrice(this.selections.frameType);
    details.push({
      label: 'Frame Type',
      selection: frameTypeOption?.name || '',
      price: frameTypePrice
    });

    const frameFinishOption = this.frameFinishes.find(f => f.id === this.selections.frameFinish);
    const frameFinishPrice = this.pricingService.getFrameFinishPrice(
      this.selections.frameType,
      this.selections.frameFinish
    );
    details.push({
      label: 'Frame Finish',
      selection: frameFinishOption?.name || '',
      price: frameFinishPrice
    });

    const wheelsOption = this.wheelTypes.find(w => w.id === this.selections.wheels);
    const wheelsPrice = this.pricingService.getWheelsPrice(this.selections.wheels);
    details.push({
      label: 'Wheels',
      selection: wheelsOption?.name || '',
      price: wheelsPrice
    });

    const rimColorOption = this.rimColors.find(c => c.id === this.selections.rimColor);
    const rimColorPrice = this.pricingService.getRimColorPrice(
      this.selections.wheels,
      this.selections.rimColor
    );
    details.push({
      label: 'Rim Color',
      selection: rimColorOption?.name || '',
      price: rimColorPrice
    });

    const chainOption = this.chainTypes.find(c => c.id === this.selections.chain);
    const chainPrice = this.pricingService.getChainPrice(this.selections.chain);
    details.push({
      label: 'Chain',
      selection: chainOption?.name || '',
      price: chainPrice
    });

    return details;
  }

  
  onSelectOption(optionId: string) {
    switch (this.currentStep) {
      case 1:
        this.selections.frameType = optionId;
        if (!this.rulesService.isWheelCompatible(optionId, this.selections.wheels)) {
          this.selections.wheels = 'road';
          this.selections.rimColor = 'black';
          this.selections.chain = 'single-speed';
        }
        break;
      case 2:
        this.selections.frameFinish = optionId;
        break;
      case 3:
        this.selections.wheels = optionId;
        if (!this.rulesService.isRimColorCompatible(optionId, this.selections.rimColor)) {
          this.selections.rimColor = 'black';
        }
        if (!this.rulesService.isChainCompatible(optionId, this.selections.chain)) {
          this.selections.chain = 'single-speed';
        }
        break;
      case 4:
        this.selections.rimColor = optionId;
        break;
      case 5:
        this.selections.chain = optionId;
        break;
    }
    this.saveSelections();
  }

  
  isOptionSelected(optionId: string): boolean {
    switch (this.currentStep) {
      case 1:
        return this.selections.frameType === optionId;
      case 2:
        return this.selections.frameFinish === optionId;
      case 3:
        return this.selections.wheels === optionId;
      case 4:
        return this.selections.rimColor === optionId;
      case 5:
        return this.selections.chain === optionId;
      default:
        return false;
    }
  }

  
  onNext() {
    if (this.currentStep < 6) {
      this.currentStep++;
    }
  }

  
  onPrevious() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  
  onStepChange(step: number) {
    this.currentStep = step;
  }

  
  onOpenRules() {
    this.router.navigate(['/rules']);
  }

  
  onStartOver() {
    this.currentStep = 1;
    this.selections = {
      frameType: 'full-suspension',
      frameFinish: 'matte',
      wheels: 'road',
      rimColor: 'black',
      chain: 'single-speed'
    };
    this.saveSelections();
  }
}
