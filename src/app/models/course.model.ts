import { Section } from './section.model';

export class Course {
  id?: string;

  constructor(
      public title: string,
      public description: string,
      public courseId: string,
      public sections: Section[],
      public image: string,
      public removeThis: boolean
  ) {}

}


