import { Injectable } from '@angular/core';

@Injectable()


export class Globals {

//  assetTypes = ['book', 'doc', 'video', 'audio', 'quote', 'block'];
//  assetLongPluralNames = ['Books', 'PDF Documents', 'Videos', 'Audio Files', 'Pull Quotes', 'HTML Blocks'];
//  assetLongSingularNames = ['Book', 'PDF Document', 'Video', 'Audio File', 'Pull Quote', 'HTML Block'];

 materialTypes = [
        { type: 'audio',   longName : 'Audio Files',        pluralName : 'audios' },
        { type: 'block',   longName : 'Blocks of Content',  pluralName : 'blocks' },
        { type: 'book',    longName : 'Book References',    pluralName : 'books' },
        { type: 'doc',     longName : 'PDF Documents',      pluralName : 'docs' },
        { type: 'image',   longName : 'Images',             pluralName : 'images' },
        { type: 'quote',   longName : 'Quotations',         pluralName : 'quotes' },
        { type: 'video',   longName : 'Videos',             pluralName : 'videos' },
         ];


// Local paths for Development

 // basepath = 'http://localhost:3100/';

// Liveserver basepath:
// basepath = 'https://ddworks.org:8000/';

// This points to the API
// basepath = 'http://localhost:3100';
//

 basepath = 'https://young-bastion-45095.herokuapp.com';
 chatServer = 'https://young-bastion-45095.herokuapp.com';

// basepath = 'https://thawing-reaches-29763.herokuapp.com';
// basepath = 'http://localhost:4200';
// basepath = 'https://ddworks.org';
// basepath = 'http://localhost:3100';

apiPath = this.basepath + '/api/';
// This points to where the images and other assets are stored
awspath = 'https://recloom.s3.amazonaws.com/';

authenticate =       this.apiPath + 'authenticate';
users =              this.apiPath + 'users';
user =               this.apiPath + 'users';
classes =            this.apiPath + 'classes';
class =              this.apiPath + 'classes/';
courses =            this.apiPath + 'courses';
course =             this.apiPath + 'courses';
postcourseimages =   this.apiPath + 'courseimages';
materials =          this.apiPath + 'materials';
postmaterialimages = this.apiPath + 'materialimages';
postmaterialfiles =  this.apiPath + 'materialfiles';
allmaterialsbytype = this.apiPath + 'allmaterialsbytype';
threads =            this.apiPath + 'threads';
postavatars =        this.apiPath + 'avatars';
series =             this.apiPath + 'series';
batchmaterials =     this.apiPath + 'batchmaterials';
discussionsettings = this.apiPath + 'discussionsettings';
notessettings =      this.apiPath + 'notessettings';
// enterdiscussion =    this.apiPath + 'discussion/enter';
// whosin =             this.apiPath + 'discussion/whosin';
enrollments =        this.apiPath + 'enrollments';
assignments =        this.apiPath + 'assignments';
messages =           this.apiPath + 'messages';
sendCFMsg =          this.apiPath + 'sendCFMsg';
announcements =      this.apiPath + 'announcements';

courseimages =       this.awspath  + 'courseimages';
materialimages =     this.awspath  + 'materialimages';
materialfiles =      this.awspath  + 'materialfiles';
avatars =            this.awspath  + 'avatars';


//  fbAppParams = {
//     appId: 'xxxxxx'
//     xfbml: true,
//     version: 'v2.11'
//   };

}
