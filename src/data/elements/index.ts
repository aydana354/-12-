import type { ElementData, ElementId } from '../../types/chemistry';
import { GOLD_DATA } from './au';
import { MERCURY_DATA } from './hg';
import { THALLIUM_DATA } from './tl';
import { LEAD_DATA } from './pb';

export const ELEMENTS_LIST: ElementData[] = [
  GOLD_DATA,
  MERCURY_DATA,
  THALLIUM_DATA,
  LEAD_DATA,
];

export const ELEMENTS_BY_ID: Record<ElementId, ElementData> = {
  au: GOLD_DATA,
  hg: MERCURY_DATA,
  tl: THALLIUM_DATA,
  pb: LEAD_DATA,
};

export function isValidElementId(id: string | undefined): id is ElementId {
  return id === 'au' || id === 'hg' || id === 'tl' || id === 'pb';
}
