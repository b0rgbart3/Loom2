import { Component, OnInit, DoCheck, OnChanges, EventEmitter, Output, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Userthumbnail } from '../../models/userthumbnail.model';
import { DiscussionSettings } from '../../models/discussionsettings.model';
import { DiscussionService } from '../../services/discussion.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { ClickOutsideDirective } from '../../directives/clickoutside.directive';

@Component({

  selector: 'bio-pop',
  templateUrl: './biopop.component.html',
  styleUrls: ['./biopop.component.css'],

})



export class BiopopComponent implements OnInit, OnChanges {

@Input() bioUser: User;
@Input() allowMessage: boolean;
@Output() closeMe = new EventEmitter<boolean>();
@Output() messageMe = new EventEmitter<User>();
clicks: number;
constructor() {

}

thumbnail: Userthumbnail;
    ngOnInit(): void {
      this.clicks = 0;
      this.makeThumb();
      if (this.allowMessage !== false) {
        this.allowMessage = true;
      }
    }

    makeThumb(): void {
      this.thumbnail = { user: this.bioUser, userId: this.bioUser.userId, online: false,
        size: 220,  showUsername: false, showInfo: false, textColor: '#ffffff', border: true, shape: 'circle' };
    }
    closer(): void {
      this.closeMe.emit(true);
    }

    checkMe(): void {
      this.clicks++;
      if (this.clicks > 1) {
        this.closer();
      }
    }
    ngOnChanges(): void {
      this.thumbnail = null;
      this.makeThumb();

    }
    message(thumbnail): void {
      this.messageMe.emit(thumbnail);
    }
  }
