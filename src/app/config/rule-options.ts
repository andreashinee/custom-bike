export interface ComponentOption {
  label: string;
  value: string;
  image?: string;
  imageType?: 'url' | 'color' | 'emoji';
  color?: string;
  description?: string;
}

export const ruleTypes: ComponentOption[] = [
  { label: 'Wheel & Frame Compatibility', value: 'wheel-frame', image: 'https://cdn.mos.cms.futurecdn.net/pJLaVu9ekAeV2ezrHYG7in.jpg', imageType: 'url', description: 'Restrict wheel options based on frame type' },
  { label: 'Rim Color & Wheel Compatibility', value: 'rim-wheel', image: 'https://www.maxxis.com/us/wp-content/uploads/sites/13/2026/05/ASPEN-AT-feature.jpg', imageType: 'url', description: 'Restrict rim colors based on wheel type' },
  { label: 'Chain & Wheel Compatibility', value: 'chain-wheel', image: 'https://www.kmcchain.com/thumb/prd/336.jpg', imageType: 'url', description: 'Restrict chain options based on wheel type' }
];

export const frameTypes: ComponentOption[] = [
  { label: 'Full-Suspension', value: 'full-suspension', image: 'https://icancycling.com/cdn/shop/products/IMG_0871.jpg?v=1751607736', imageType: 'url', description: 'Maximum absorption for rough terrain' },
  { label: 'Diamond', value: 'diamond', image: 'https://http2.mlstatic.com/D_746506-MLB83813634068_042025-C.jpg', imageType: 'url', description: 'Classic and versatile design' },
  { label: 'Step-Through', value: 'step-through', image: 'https://contents.mediadecathlon.com/p2635344/k$fbbb5328e59a9316043519d17661af7d/picture.jpg?format=auto&f=3000x0', imageType: 'url', description: 'Easy access and comfort' }
];

export const wheelTypes: ComponentOption[] = [
  { label: 'Road', value: 'road', image: 'https://cdn.mos.cms.futurecdn.net/pJLaVu9ekAeV2ezrHYG7in.jpg', imageType: 'url', description: 'Speed and efficiency on pavement' },
  { label: 'Mountain', value: 'mountain', image: 'https://www.maxxis.com/us/wp-content/uploads/sites/13/2026/05/ASPEN-AT-feature.jpg', imageType: 'url', description: 'Grip and durability for trails' },
  { label: 'Fat Bike', value: 'fat-bike', image: 'https://m.media-amazon.com/images/I/91uzmQ9td6L._AC_UF894,1000_QL80_.jpg', imageType: 'url', description: 'Superior traction on any surface' }
];

export const rimColors: ComponentOption[] = [
  { label: 'Red', value: 'red', color: '#ef4444', imageType: 'color', description: 'Bold and energetic' },
  { label: 'Black', value: 'black', color: '#1a1a1a', imageType: 'color', description: 'Classic and timeless' },
  { label: 'Blue', value: 'blue', color: '#3b82f6', imageType: 'color', description: 'Cool and modern' }
];

export const chainTypes: ComponentOption[] = [
  { label: 'Single-Speed', value: 'single-speed', image: 'https://www.kmcchain.com/thumb/prd/336.jpg', imageType: 'url', description: 'Simple and lightweight' },
  { label: '8-Speed', value: '8-speed', image: 'https://www.bicyclepartswarehouse.com.au/wp-content/uploads/2023/09/0351a.png', imageType: 'url', description: 'Versatile gearing options' }
];

export const ruleTypeLabels: Record<string, string> = {
  'wheel-frame': 'Wheel & Frame Incompatibility',
  'rim-wheel': 'Rim Color & Wheel Incompatibility',
  'chain-wheel': 'Chain & Wheel Incompatibility'
};

export const componentLabels: Record<string, string> = {
  'frameType': 'Frame Type',
  'wheels': 'Wheels',
  'rimColor': 'Rim Color',
  'chain': 'Chain'
};

export const optionLabels: Record<string, Record<string, string>> = {
  'frameType': { 'full-suspension': 'Full-Suspension', 'diamond': 'Diamond', 'step-through': 'Step-Through' },
  'wheels': { 'road': 'Road', 'mountain': 'Mountain', 'fat-bike': 'Fat Bike' },
  'rimColor': { 'red': 'Red', 'black': 'Black', 'blue': 'Blue' },
  'chain': { 'single-speed': 'Single-Speed', '8-speed': '8-Speed' }
};

export const descriptionLabels: Record<string, { if: string; then: string }> = {
  'wheel-frame': { if: 'FRAME TYPE', then: 'WHEELS' },
  'rim-wheel': { if: 'WHEELS', then: 'RIM COLOR' },
  'chain-wheel': { if: 'WHEELS', then: 'CHAIN' }
};

export const componentMap: Record<string, { if: string; then: string }> = {
  'wheel-frame': { if: 'frameType', then: 'wheels' },
  'rim-wheel': { if: 'wheels', then: 'rimColor' },
  'chain-wheel': { if: 'wheels', then: 'chain' }
};

const optionArrays: Record<string, ComponentOption[]> = {
  'frameType': frameTypes,
  'wheels': wheelTypes,
  'rimColor': rimColors,
  'chain': chainTypes
};

export function getConditionOptions(ruleType: string | null): ComponentOption[] {
  switch (ruleType) {
    case 'wheel-frame': return frameTypes;
    case 'rim-wheel': return wheelTypes;
    case 'chain-wheel': return wheelTypes;
    default: return [];
  }
}

export function getIncompatibleOptions(ruleType: string | null): ComponentOption[] {
  switch (ruleType) {
    case 'wheel-frame': return wheelTypes;
    case 'rim-wheel': return rimColors;
    case 'chain-wheel': return chainTypes;
    default: return [];
  }
}

export function getOptionLabel(component: string, value: string): string {
  return optionLabels[component]?.[value] || value;
}

export function getOptionLabels(component: string, values: string[]): string {
  return values.map(v => getOptionLabel(component, v)).join(', ');
}
