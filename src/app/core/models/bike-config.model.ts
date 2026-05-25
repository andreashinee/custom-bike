export interface ConfigSelection {
  frameType: string;
  frameFinish: string;
  wheels: string;
  rimColor: string;
  chain: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  completed?: boolean;
  active?: boolean;
}

export interface PriceSelection {
  name: string;
  price: number;
}

export type PriceSelections = Record<string, PriceSelection>;

export interface BikeOption {
  id: string;
  title: string;
  description?: string;
  price: number;
  selected: boolean;
  disabled?: boolean;
  image?: string;
  imageType?: 'url' | 'color' | 'emoji';
  color?: string;
}