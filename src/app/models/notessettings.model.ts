export class NotesSettings {
    id?: string;

    constructor(
        public userId: string,
        public classId: string,
        public section: string,
        public reading: boolean,
        public folds: boolean[]

    ) {}

}
