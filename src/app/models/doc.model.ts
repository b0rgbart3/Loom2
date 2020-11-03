export class Doc {
    id?: string;

    constructor(
        public title: string,
        public description: string,
        public author: string,
        public docId: string,
        public image: string,
        public imageURL: string,
        public file: string,
        public fileURL: string,
        public owner: string   // this is the id of the user who uploaded this (?)
    ) {}

  }
