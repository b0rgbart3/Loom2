import { User } from './user.model';
import { ClassModel } from './classModel.model';

export class Assignment {
    id?: string;

    constructor(
        public assignmentId: string,
        public userId: string,
        public classId: string,
        public status: string[],

        // non-stored parameters -- perhaps I should make these Non-Enumerable?
        public thisUser: User,
        public thisClass: ClassModel,

    ) {}

}
