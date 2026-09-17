import { FammeVariant } from './famme-variant.model';

export interface FammeProduct {
  id: number;
  title: string;
  bodyHtml: string;
  variants: FammeVariant[];
}