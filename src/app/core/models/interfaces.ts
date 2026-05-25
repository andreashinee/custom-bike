export interface ConfigSelection {
  frameType: string;
  frameFinish: string;
  wheels: string;
  rimColor: string;
  chain: string;
}

export interface Rule {
  id: string;
  type: 'wheel-frame' | 'rim-wheel' | 'chain-wheel';
  description: string;
  condition: {
    if: { component: string; value: string };
    then: { component: string; incompatible: string[] };
  };
}

export interface Option {
  id: string;
  name: string;
  description: string;
  image?: string;
  imageType?: 'url' | 'color' | 'emoji';
  color?: string;
  emoji?: string;
  disabled?: boolean;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  completed?: boolean;
  active?: boolean;
}

export interface PriceDetail {
  label: string;
  selection: string;
  price: number;
}

export interface SavedConfiguration {
  name: string;
  timestamp: number;
  selections: ConfigSelection;
  referenceCode: string;
  totalPrice: number;
}
