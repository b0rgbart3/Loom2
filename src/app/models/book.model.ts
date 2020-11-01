export class Book {
  id?: string;

  constructor(
      public title: string,
      public description: string,
      public author: string,
      public bookId: string,
      public purchaseURL: string,
      public image: string,
      public imageURL: string,
      public owner: string   // this is the id of the user who uploaded this
  ) {}

}


