import { Enrollment } from './enrollment.model';
import { BoardSettings } from './boardsettings.model';

export class Reset {
    id?: string;

    constructor(
        public resetKey: string,
        public email: string,
        public password: string,
        public passwordConfirmation: string,
        public token: string,  // I haven't implement this yet - but tokenizing the password should be done

    ) {}

}
