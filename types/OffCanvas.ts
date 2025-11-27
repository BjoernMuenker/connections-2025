import type { OffCanvasComponent } from './OffCanvasComponent';

export interface OffCanvas {
  component?: OffCanvasComponent;
  componentProps?: { [key: string]: any };
  heading?: string;
  clickOutside?: boolean;
  closeButton?: boolean;
}
