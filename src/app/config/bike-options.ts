import { Option, Step } from '@models/interfaces';

export const codeMap: Record<string, Record<string, string>> = {
  frameType: { 'full-suspension': 'FS', 'diamond': 'DIA', 'step-through': 'ST' },
  frameFinish: { 'shiny': 'SH', 'matte': 'M' },
  wheels: { 'road': 'RD', 'mountain': 'MT', 'fat-bike': 'FB' },
  rimColor: { 'red': 'RED', 'black': 'BLK', 'blue': 'BLU' },
  chain: { 'single-speed': 'SS', '8-speed': '8S' },
};

export const defaultSelections = {
  frameType: 'full-suspension',
  frameFinish: 'matte',
  wheels: 'road',
  rimColor: 'black',
  chain: 'single-speed'
};

export const steps: Step[] = [
  { number: 1, title: 'Frame Type', description: 'Choose your base' },
  { number: 2, title: 'Finish', description: 'Matte or Shiny' },
  { number: 3, title: 'Wheels', description: 'Select terrain' },
  { number: 4, title: 'Rim Color', description: 'Add personality' },
  { number: 5, title: 'Chain', description: 'Pick your speed' },
  { number: 6, title: 'Summary', description: 'Review & confirm' }
];

export const frameTypes: Option[] = [
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

export const frameFinishes: Option[] = [
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

export const wheelTypes: Option[] = [
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

export const rimColors: Option[] = [
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

export const chainTypes: Option[] = [
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

export const allOptionsByComponent: Record<string, Option[]> = {
  frameType: frameTypes,
  frameFinish: frameFinishes,
  wheels: wheelTypes,
  rimColor: rimColors,
  chain: chainTypes,
};
