import { ImageSourcePropType } from "react-native/Libraries/Image/Image";

export type Product = {
  id: string;
  name: string;
  price: number;
  isNew?: boolean;
  globalExpress?: boolean;
  images: (ImageSourcePropType | null)[];
  details: string[];
  shipping: string;
  imageContents?: string[];
  isSeries?: boolean;
  productUnits?: ProductUnit[]
};

export type ProductUnit = {
  id: string;
  label: string;
  image?: string; 
  price?: number;
  outOfStock?: boolean;
};