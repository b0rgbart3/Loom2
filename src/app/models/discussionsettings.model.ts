export class DiscussionSettings {
    id?: string;

    constructor(
        public dsId: string,
        public userId: string,
        public classId: string,
        public section: string,
        public discussing: boolean,
        public folds: boolean[]

    ) {}

}
