import { User } from './user.model';

export class Userthumbnail {
  id?: string;

  constructor(
      public user: User,
      public userId: string,
      public online: boolean,  // This is not implemented yet
      public size: number,
      public showUsername: boolean,
      public showInfo: boolean,
      public textColor: string,
      public border: boolean,
      public shape: string,

  ) {}

}


