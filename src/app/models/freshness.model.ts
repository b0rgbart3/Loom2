import { MessageReply } from './messagereply.model';

export class Freshness {
    id?: string;

    constructor(
        public userId: string,
        public fresh: boolean
    ) {}
  }
