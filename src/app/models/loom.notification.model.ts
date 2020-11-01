export class LoomNotification {
    id?: string;

    constructor(
        public type: string,
        public message: string[],
        public delay: number
    ) {}

  }

