export class User {
    id?: string;

    constructor(
        public userId: string,
        public username: string,
        public firstname: string,
        public middlename: string,
        public lastname: string,
        public email: string,
        public bio: string,
        public password: string,
        public token: string,
        public verificationID: string,
        public verified: string,
        public instructor: boolean,
        public admin: boolean,
        public suspended: boolean,
        public favoritecolor: string,
        public avatarFilename: string,
        public avatarURL: string,
        public createdDate: string,
        public verifiedDate: string,
        public completedClasses: string[],
        public completedSeries: string[],


    ) {}

}
