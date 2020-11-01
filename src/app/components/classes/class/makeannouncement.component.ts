import { OnInit, Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Announcements } from '../../models/announcements.model';
import { AnnouncementsService } from '../../services/announcements.service';
import { Router } from '@angular/router';


@Component({

    selector: 'make-announcement',
    templateUrl: './makeannouncement.component.html',
    styleUrls: ['./makeannouncement.component.css'],

  })

  export class MakeAnnouncementComponent implements OnInit {

    form: FormGroup;
    announcement: Announcements;
    @Input() classID: string;
    @Input() instructorID: string;
    @Output() close = new EventEmitter <Announcements>();


    constructor( private formBuilder: FormBuilder, private announcementsService: AnnouncementsService, private router: Router ) { }
    ngOnInit(): void {
        this.announcement = new Announcements('0', this.classID, this.instructorID, '', '' );
        this.form = this.formBuilder.group( {
            title: ['',  Validators.required],
            announcement: ['',  Validators.required],
            announcement_date: [new Date(), []],
        });
    }

    closeMe(): void {
        this.close.emit( null );
    }

    submitForm(): void {
        if (this.form.dirty) {

            console.log('Form was dirty');

            // This is Deborah Korata's way of merging our data model with the form model
             const combinedObject = Object.assign( {}, this.announcement, this.form.value);

             combinedObject.classId = +this.classID;
             combinedObject.instructor_id = +this.instructorID;

             if ( +this.announcement.id > 0 ) {
                console.log('calling update: ');
                this.announcementsService
                .update( combinedObject ).subscribe(
                (val) => {
             console.log('announcement update.');
            }, response => { this.router.navigate(['/admin/classes']); },
                () => { });

            } else {
                this.announcementsService.create( combinedObject ).subscribe(
                    (val) => {
                       this.announcement = val;
                     }, (response) => { console.log('save completed');
                      }
                    ,
                      () => {  this.close.emit( this.announcement ); });
            }
        }

    }
  }
