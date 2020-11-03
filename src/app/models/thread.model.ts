import { Reply } from './reply.model';

export class Thread {
    id?: string;

    constructor(
        public threadId: string,
        public userId: string,
        public classId: string,
        public section: string,
        public postDate: Date,
        public subject: string,
        public replies: Reply [],
        public displayReplyInput: boolean,
        public collapsed: boolean
    ) {}

  }

