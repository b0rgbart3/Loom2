import { Course } from './course.model';

export class ClassModel {
  id?: string;

  constructor(
      public title: string,
      public course: string,
      public start: Date,
      public end: Date,
      public classId: string,
      public cost: string,
      // public instructors: Instructor[],
      // public students: Student[],
      public courseObject: Course,
      public courseImageURL: string,
      public costBlurb: string,
      public removeThis: boolean

  ) {}

}


