import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Userthumbnail } from '../../../models/userthumbnail.model';
import { Globals } from '../../../../globals';

@Component({
    selector: 'app-user-thumb',
    templateUrl: './user-thumbnail.component.html',
    styleUrls: ['./user-thumbnail.component.css'],
})

export class UserThumbnailComponent implements OnInit {
    @Input() thumbnail: Userthumbnail;

    userCount: number;
    users: User[];
    filteredUsers: User[];
    selectedUser: User;
    errorMessage: string;
    inClass: string;
    shapeClass: string;
    borderStyle: string;

    avatarImageURL: string;

    constructor(private userService: UserService, private globals: Globals) { }

    ngOnInit(): void {

        console.log('initializing user thumbnail.');
        if (this.thumbnail) {
            if (!this.thumbnail.user) {

                this.userService.getUser(this.thumbnail.userId).subscribe(
                    user => {
                        this.thumbnail.user = user[0];
                    },
                    error => this.errorMessage = error);
            }

            this.avatarImageURL = this.globals.avatars + '/' +
                this.thumbnail.userId + '/' + this.thumbnail.user.avatarFilename;

            // if (this.thumbnail.user && this.thumbnail.user.facebookRegistration) {
            //     console.log('fb user: ' + JSON.stringify(this.thumbnail.user));
            //     // this.thumbnail.user.avatar_URL = this.thumbnail.user.avatar_URL;
            //     this.avatarImageURL = this.thumbnail.user.avatarURL;
            // } else {
            if (this.thumbnail.user && this.thumbnail.user.avatarFilename === '') {
                this.thumbnail.user.avatarURL = this.globals.avatars + '/placeholder.png';
                this.avatarImageURL = this.thumbnail.user.avatarURL;
            }
            if (this.thumbnail.user.avatarFilename === undefined) {
                this.thumbnail.user.avatarURL = this.globals.avatars + '/placeholder.png';
                this.avatarImageURL = this.thumbnail.user.avatarURL;
            }
            // }

            this.borderStyle = '';
            if (this.thumbnail.border) {
                this.borderStyle = ' noGlow';
            }
            this.shapeClass = this.thumbnail.shape + this.borderStyle;

        }
    }
}

