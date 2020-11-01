export class MessageReply {
    id?: string;

    constructor(
        public userId: string,
        public message: string
    ) {}
  }
