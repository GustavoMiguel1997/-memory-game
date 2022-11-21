import { IconType } from '../assets/icons';

export type TCard = {
  name: string;
  Icon: IconType;
  color?: string;
  status?: '' | 'selected' | 'checked';
};
