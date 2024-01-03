import { incrementalNumber, randCompanyName } from '@ngneat/falso';
import { Push } from './push.model';

export interface School extends Push {
  id: number;
  name: string;
  version: number;
}

const factoryTeacher = incrementalNumber();

export const randSchool = (): School => ({
  id: factoryTeacher(),
  name: randCompanyName(),
  version: 0,
  type: 'school',
});

export const isSchool = (notif: Push): notif is School => {
  return notif.type === 'school';
};