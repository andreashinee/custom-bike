import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '@components/common/header/header';
import { BikePreviewComponent } from '@components/custom-bike/bike-preview/bike-preview';
import { StepperComponent } from '@components/custom-bike/stepper/stepper';
import { OptionCardComponent } from '@components/custom-bike/option-card/option-card';
import { PriceSummaryComponent } from '@components/custom-bike/price-summary/price-summary';
import { Button } from 'primeng/button';
import { ConfigSelection, Step, Option, PriceDetail, SavedConfiguration } from '@models/interfaces';
import { PricingService } from '@services/pricing.service';
import { RulesService } from '@services/rules.service';


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

  private readonly codeMap: Record<string, Record<string, string>> = {
    frameType: { 'full-suspension': 'FS', 'diamond': 'DIA', 'step-through': 'ST' },
    frameFinish: { 'shiny': 'SH', 'matte': 'M' },
    wheels: { 'road': 'RD', 'mountain': 'MT', 'fat-bike': 'FB' },
    rimColor: { 'red': 'RED', 'black': 'BLK', 'blue': 'BLU' },
    chain: { 'single-speed': 'SS', '8-speed': '8S' },
  };

  get referenceCode(): string {
    const parts: string[] = [];
    for (const key of ['frameType', 'frameFinish', 'rimColor', 'chain'] as const) {
      const val = this.selections[key];
      parts.push(this.codeMap[key]?.[val] ?? val.toUpperCase());
    }
    return parts.join('-');
  }

  selections: ConfigSelection = {
    frameType: 'full-suspension',
    frameFinish: 'matte',
    wheels: 'road',
    rimColor: 'black',
    chain: 'single-speed'
  };

  steps: Step[] = [
    { number: 1, title: 'Frame Type', description: 'Choose your base' },
    { number: 2, title: 'Finish', description: 'Matte or Shiny' },
    { number: 3, title: 'Wheels', description: 'Select terrain' },
    { number: 4, title: 'Rim Color', description: 'Add personality' },
    { number: 5, title: 'Chain', description: 'Pick your speed' },
    { number: 6, title: 'Summary', description: 'Review & confirm' }
  ];

  frameTypes: Option[] = [
    {
      id: 'full-suspension',
      name: 'Full-Suspension',
      description: 'Maximum absorption for rough terrain',
      image: 'https://icancycling.com/cdn/shop/products/IMG_0871.jpg?v=1751607736',
      imageType: 'url'
    },
    {
      id: 'diamond',
      name: 'Diamond',
      description: 'Classic and versatile design',
      image: 'https://http2.mlstatic.com/D_746506-MLB83813634068_042025-C.jpg',
      imageType: 'url'
    },
    {
      id: 'step-through',
      name: 'Step-Through',
      description: 'Easy access and comfort',
      image: 'https://contents.mediadecathlon.com/p2635344/k$fbbb5328e59a9316043519d17661af7d/picture.jpg?format=auto&f=3000x0',
      imageType: 'url'
    }
  ];

  frameFinishes: Option[] = [
    {
      id: 'matte',
      name: 'Matte',
      description: 'Elegant and subtle finish',
      image: 'https://media.istockphoto.com/id/1133405969/es/foto/fondo-negro-mate.jpg?s=612x612&w=0&k=20&c=6XLnwgpD5XNxhbdTXKiXoYBl8AtNN7_nYQqnSXAemvM=',
      imageType: 'url'
    },
    {
      id: 'shiny',
      name: 'Shiny',
      description: 'Glossy and eye-catching',
      image: 'https://img.magnific.com/foto-gratis/fondo-textura-lisa-negra_53876-98437.jpg?semt=ais_hybrid&w=740&q=80',
      imageType: 'url'
    }
  ];

  wheelTypes: Option[] = [
    {
      id: 'road',
      name: 'Road',
      description: 'Speed and efficiency on pavement',
      image: 'https://cdn.mos.cms.futurecdn.net/pJLaVu9ekAeV2ezrHYG7in.jpg',
      imageType: 'url'
    },
    {
      id: 'mountain',
      name: 'Mountain',
      description: 'Grip and durability for trails',
      image: 'https://www.maxxis.com/us/wp-content/uploads/sites/13/2026/05/ASPEN-AT-feature.jpg',
      imageType: 'url'
    },
    {
      id: 'fat-bike',
      name: 'Fat Bike',
      description: 'Superior traction on any surface',
      image: 'https://m.media-amazon.com/images/I/91uzmQ9td6L._AC_UF894,1000_QL80_.jpg',
      imageType: 'url'
    }
  ];

  rimColors: Option[] = [
    {
      id: 'red',
      name: 'Red',
      description: 'Bold and energetic',
      color: '#ef4444',
      imageType: 'color'
    },
    {
      id: 'black',
      name: 'Black',
      description: 'Classic and timeless',
      color: '#1a1a1a',
      imageType: 'color'
    },
    {
      id: 'blue',
      name: 'Blue',
      description: 'Cool and modern',
      color: '#3b82f6',
      imageType: 'color'
    }
  ];

  chainTypes: Option[] = [
    {
      id: 'single-speed',
      name: 'Single-Speed',
      description: 'Simple and lightweight',
      image: 'https://www.kmcchain.com/thumb/prd/336.jpg',
      imageType: 'url'
    },
    {
      id: '8-speed',
      name: '8-Speed',
      description: 'Versatile gearing options',
      image: 'https://www.bicyclepartswarehouse.com.au/wp-content/uploads/2023/09/0351a.png',
      imageType: 'url'
    }
  ];

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
