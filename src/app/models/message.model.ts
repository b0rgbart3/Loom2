import { MessageReply } from './messagereply.model';
import { Freshness } from './freshness.model';

export class Message {
    id?: string;

    constructor(
        public messageId: string,
        public users: string[],
        public freshness: Freshness[],
        public msgList: MessageReply[]
    ) {}
  }
