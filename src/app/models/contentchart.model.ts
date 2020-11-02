import { Material } from './material.model';

// This chart includes all the info from a given section - plus the material info added in,
// as full material objects -- rather than just references (as it is in the database)

export class ContentChart {
  id?: string;

  constructor(
    public courseId: string,
    public title: string,
    public chartId: string,
    public content: string,
    public materials: Material[],


  ) {}

}


