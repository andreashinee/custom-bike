import { Component, Input, OnInit } from '@angular/core';
import { ConfigSelection } from '@models/interfaces';

interface Point {
  x: number;
  y: number;
}

interface Geometry {
  frontHub: Point;
  rearHub: Point;
  bb: Point;
  seatTop: Point;
  seatPostTop: Point;
  headTop: Point;
  headBot: Point;
  stemEnd: Point;
}


@Component({
  selector: 'app-bike-preview',
  standalone: true,
  imports: [],
  templateUrl: './bike-preview.html',
  styleUrl: './bike-preview.scss'
})
export class BikePreviewComponent implements OnInit {
  
  @Input() selections!: ConfigSelection;

  
  @Input() currentStep: number = 1;

  GEO!: Geometry;
  spokes: number[] = [];
  particles: number[] = [];

  // Constantes de geometría
  readonly WHEEL_R = 95;
  readonly TIRE_W = 18;
  readonly RIM_R = 84;
  readonly FRAME_STROKE = 18;
  readonly FRAME_STAY = 14;

  
  ngOnInit() {
    // Inicializar geometría
    this.GEO = {
      frontHub: { x: 595, y: 320 },
      rearHub: { x: 255, y: 320 },
      bb: { x: 410, y: 325 },
      seatTop: { x: 385, y: 170 },
      seatPostTop: { x: 380, y: 125 },
      headTop: { x: 520, y: 175 },
      headBot: { x: 505, y: 235 },
      stemEnd: { x: 555, y: 150 }
    };

    // Radios de las ruedas
    this.spokes = Array.from({ length: 28 }, (_, i) => i);

    // Partículas
    this.particles = Array.from({ length: 18 }, (_, i) => i);
  }

  
  get rim(): string {
    const colors: Record<string, string> = {
      'black': '#111111',
      'red': '#ef4444',
      'blue': '#3b82f6',
    };
    return colors[this.selections.rimColor] || '#111111';
  }

  
  get frameBase(): string {
    return this.selections.frameFinish === 'shiny' ? '#0b0b0b' : '#111111';
  }

  
  get frameAccent(): string {
    return this.selections.frameFinish === 'shiny' ? 'url(#frameGloss)' : this.frameBase;
  }

  
  get isFrameHighlighted(): boolean {
    return this.currentStep === 1 || this.currentStep === 2;
  }

  
  get isWheelHighlighted(): boolean {
    return this.currentStep === 3 || this.currentStep === 4;
  }

  
  get isChainHighlighted(): boolean {
    return this.currentStep === 5;
  }

  
  get frameStroke(): string {
    return this.isFrameHighlighted ? '#FF6A00' : this.frameAccent;
  }

  
  get wheelStroke(): string {
    return this.isWheelHighlighted ? '#FF6A00' : this.rim;
  }

  
  get chainStroke(): string {
    return this.isChainHighlighted ? '#FF6A00' : '#111111';
  }

  
  P(p: Point): string {
    return `${p.x} ${p.y}`;
  }

  
  getSpokeCoords(index: number, hub: Point, isRear: boolean): { x1: number; y1: number; x2: number; y2: number } {
    const ang = (index * 360) / this.spokes.length;
    const rad = (ang * Math.PI) / 180;
    return {
      x1: hub.x,
      y1: hub.y,
      x2: hub.x + (this.RIM_R - 6) * Math.cos(rad),
      y2: hub.y + (this.RIM_R - 6) * Math.sin(rad)
    };
  }

  
  getGlowFilter(): string {
    return this.isFrameHighlighted ? 'url(#glowOrange)' : '';
  }

  
  getWheelGlowFilter(): string {
    return this.isWheelHighlighted ? 'url(#glowOrange)' : '';
  }

  
  getChainGlowFilter(): string {
    return this.isChainHighlighted ? 'url(#glowOrange)' : '';
  }
}
