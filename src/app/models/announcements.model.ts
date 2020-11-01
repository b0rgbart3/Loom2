export class Announcements {
    id?: string;

    constructor(

        public announcementId: string,
        public classId: string,
        public insstructorId: string,
        public title: string,
        public announcement: string
    ) {}

}
