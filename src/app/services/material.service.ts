import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Globals } from '../../globals';
import { Material } from '../models/material.model';
import { MaterialCollection } from '../models/materialcollection.model';
import _ from 'lodash';

@Injectable()
export class MaterialService {

    materialCount = 0;
    highestID = 0;
    materials: Material[];
    removed: Material[];
    material: Material;
    errorMessage: string;
    bookArray: Material[];
    docArray: Material[];
    allMaterialsByType: Material[][];


    /* Methods in this service:
    getDynamicMaterials( id, type )
    getAllMaterialsByType ()
    getBatchMaterials( list )
    getMaterials( course_id ):
    sortMaterials()
     getNextId()
     updateIDCount()
     getMaterial(id):
     deleteMaterial(id: string):
     createMaterial(courseObject: Material):
     updateMaterial(courseObject: Material):
    */

    constructor(private http: HttpClient, private globals: Globals) {}


  takeInResolvedData(materials: Material[]): void {
    this.materials = materials;
  }


    getAllMaterialsByType(): Observable<any> {

       return this.http.get <Material[][]>
              (this.globals.allmaterialsbytype);
        //       .do(data => {
        //         this.allMaterialsByType = data;
        // }).catch(this.handleError);

    }

    getDynamicMaterials( id, type ): Observable<Material[]> {
      if (id === 0) {
        // get all the objects for this type
      //  console.log('\nIn material service / getDM: ' + type + '\n');
        return this.http.get <Material[]>
              (this.globals.materials + '?type=' + type);
              // .do(data => {

               // console.log('docs:');
              //  data.map( doc => console.log(doc.title));
                // Let's alphabetize this list of Materials before we send it back
                // const sortedObjs = _.sortBy(data, item => item.title );

                // console.log('sorted docs: ');
                // sortedObjs.map( doc => console.log(doc.title));

            //    const activeMaterials = this.hideRemovalsFromBatch( data );
               // return data;
       // }).catch(this.handleError);
      } else {
        // pass back a single object of this type
        return this.http.get <Material[]>
              (this.globals.materials + '?id=' + id + '&type=' + type);
        //       .do(data => {
        //   // keeping a local copy of the data object
        //   // -- though I don't think we do anything with it
        //   return data; }).catch( this.handleError );
        //
      }

    }

    getBatchMaterialsFromMemory(list): Material[] {
      let matArray = [];
      if (list) {
        // console.log('LIST: ' + JSON.stringify(list));
        matArray = list.map( id => this.getMaterialFromMemory(id) ); }
      return matArray;
    }

    getMaterialFromMemory(queryID): Material {

      if (this.materials) {
      //  console.log('looking: ' + queryID, ' in: ', this.materials);
        return this.materials.filter( (thisMaterial) => thisMaterial.id === queryID)[0];

    }
    else {
      return null;
    }
  }

    getBatchMaterials(list: []): Observable<any> {
      const queryString = '?materials=';
      const serialized = list.toString();
      return this.http.get <Material[]> ( this.globals.batchmaterials + queryString + serialized);

    }
    // We want to get all the material objects for the entire course -- but
    // not all the material objects in the entire database -- so we'll grab
    // them using the corresponding course_id.
   getMaterials(): Observable <Material[]> {
    return this.http.get <Material[]> (this.globals.materials);
  }

  getAllMaterials(): Observable <Material[]> {
    return this.http.get <Material[]> (this.globals.materials);
  }

  hideRemovalsFromBatch( batch ): [] {
    // For now I'm just going to remove the class objects that are 'marked for removal'
    // from our main array -- and store them in a separate array
    this.removed = [];
    if (batch && batch.length > 0) {
      for (let i = 0; i < batch.length; i++) {
        if (batch[i].remove_this) {
          this.removed.push(batch[i]);
          batch.splice(i, 1);
        }
      }
    }
   // console.log('after hiding materials: ' + JSON.stringify(this.removed));
    return batch;
  }

  hideRemovals(): void {
    // For now I'm just going to remove the class objects that are 'marked for removal'
    // from our main array -- and store them in a separate array
    this.removed = [];
    if (this.materials && this.materials.length > 0) {
      for (let i = 0; i < this.materials.length; i++) {
        if (this.materials[i].removeThis) {
          this.removed.push(this.materials[i]);
          this.materials.splice(i, 1);
        }
      }
    }
   // console.log('after hiding materials: ' + JSON.stringify(this.removed));
  }

  getNextId(): string {

        this.updateIDCount();
        return this.highestID.toString();

  }


  updateIDCount(): void {
      // Loop through all the Materials to find the highest ID#
   //   console.log('UPDATING ID COUNT: ' + this.highestID);
    //  console.log( 'length' + this.materials.length);
      if (this.materials && this.materials.length > 0) {

        this.materials.map( material => {
          const foundID = parseInt( material.id, 10);
          if (foundID >= this.highestID) {
            const newHigh = foundID + 1;
            this.highestID = newHigh;
          }
        });
     } else { this.highestID = 1; }
 //   console.log('highest ID: ' + this.highestID);
  }


  getMaterial(id): Observable<any> {
    return this.http.get<Material> ( this.globals.materials + '?id=' + id );
      // .do(data => {
      //    // console.log( 'found: ' + JSON.stringify(data) );
      // return data; })
      // .catch (this.handleError);
  }

  remove( object: Material): Observable<any> {
    object.removeThis = true;
    const myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');

    return this.http.put(this.globals.materials + '?id=' + object.id, object, {headers: myHeaders});

  }

  recover(object): Observable <any> {
    object.remove_this = false;
    return this.updateMaterial(object);
    // .do(
    //   data => {
    //     // add this course object back into our main array
    //     this.materials.push(data);
    //     // remove this course object from our list of removed courses
    //     for (let i = 0; i < this.removed.length; i++) {
    //       if ( this.removed[i].id === data.id) {
    //         this.removed.splice(i, 1);
    //       }
    //     }

    //    // console.log('recovering course data');
    //     return data; }   )
    //   .catch( this.handleError );

  }
  deleteMaterial(id: string): Observable<any> {
      return this.http.delete( this.globals.materials + '?id=' + id);
  }

  private extractData(res: Response): {} {
    const body = res.json();
    return body || {};
  }

  createMaterial(object: Material): Observable<any> {
      const myHeaders = new HttpHeaders();
      myHeaders.append('Content-Type', 'application/json');
      // let thisID = this.courseCount + 1;
      // console.log('highestID: ' + this.highestID);
      if (this.highestID < 1) {
        this.highestID = 1;
      }
      object.id = this.highestID.toString();

      // courseObject.id = '' + thisID;
      const body =  JSON.stringify(object);
   //   console.log( 'Posting Material: ');
      this.materials.push(object);
      this.updateIDCount();
      return this.http.put(this.globals.materials + '?id=' +
      object.id, object, {headers: myHeaders} );
   }

   updateMaterial(courseObject: Material): Observable<any> {
      const myHeaders = new HttpHeaders();
      myHeaders.append('Content-Type', 'application/json');
      const body =  JSON.stringify(courseObject);
      // console.log( 'Posting Course: ', body   );
      return this.http.put(this.globals.materials + '?id=' +
       courseObject.id, courseObject, {headers: myHeaders} );
   }

    private handleError(error: HttpErrorResponse): any {
      // console.log( error.message );
      return error.message;

    }

    sortMaterials( materialsArray ): MaterialCollection {

      let videos = [];
      let docs = [];
      let books = [];
      let audios = [];
      let quotes = [];
      let blocks = [];
      let images = [];

    //  console.log('Material Array length = ' + materialsArray.length);

      materialsArray.forEach( material => {
        switch (material.type) {
          case 'video':
            videos.push(material);
            break;
          case 'image':
            material.imageURL = this.globals.materialimages + '/' + material.id + '/' + material.image;
          //  console.log('Processing image: ' + JSON.stringify( materialsArray[i] ) );
            images.push(material);
            break;
          case 'book':
            books.push(material);
            // console.log(materialsArray[i]);
            // console.log('Found a book: ' + i);
            break;
          case 'doc':
            material.imageURL = this.globals.materialimages + '/' + material.id + '/' + material.image;
            material.fileURL = this.globals.materialfiles + '/' + material.id + '/' + material.file;
            docs.push(material);
            break;
          case 'audio':
            audios.push(material);
            break;
          case 'quote':
            // console.log('found a quote.');
            quotes.push(material);
            break;
          case 'block':
            blocks.push(material);
            break;
          default:
            break;
        }
      });

        // { 'type': 'image',   'longName' : 'Images',          'pluralName' : 'images' },
        // { 'type': 'video',   'longName' : 'Videos',          'pluralName' : 'videos' },
        // { 'type': 'audio',   'longName' : 'Audio Files',     'pluralName' : 'audios' },
        // { 'type': 'doc',     'longName' : 'PDF Documents',   'pluralName' : 'docs' },
        // { 'type': 'quote',   'longName' : 'Quotations',      'pluralName' : 'quotes' },
        // { 'type': 'block',   'longName' : 'HTML Content',    'pluralName' : 'blocks' },
        // { 'type': 'book',    'longName' : 'Book References', 'pluralName' : 'books' }   ];


      audios = this.sort(audios);
      blocks = this.sort(blocks);
      books = this.sort(books);
      docs = this.sort(docs);
      images = this.sort(images);
      quotes = this.sort(quotes);
      videos = this.sort(videos);

     // const sortedMaterials = new MaterialCollection(images, videos, docs, books, audios, blocks, quotes);
      const sortedMaterials = new MaterialCollection( audios, blocks, books, docs, images, quotes, videos );
     // console.log('quotes: ' + JSON.stringify(quotes));
      // console.log('Sorted Mats: ' + JSON.stringify(sortedMaterials.quotes));
      return sortedMaterials;

    }


    sortMaterialArray( materials ): Material[] {
      // This is a "buble sort" algorithm - which I know is NOT the best algorithm for sorting, so I might
      // replace this with a better algorithm at some point.

      // don't bother unless we have an actual array of materials to work with
      if (materials && materials.length > 1) {

        let currentTitle = '';

        // loop through all the titles - except the last
        for ( let i = 0; i < materials.length - 1; i++) {
            currentTitle = materials[i].title;

            let comparativeTitle = '';
            // compare each title with the title after it
            for ( let j = i; j < materials.length; j++) {
              comparativeTitle = materials[j].title;

              if (currentTitle > comparativeTitle) {
                // if the first is 'larger' than the 2nd, then swap them
                const dummyMaterial = materials[j];
                materials[j] = materials[i];
                materials[i] = dummyMaterial;
              }
            }

        }

      }
      return materials;
    }

    // I don't quite understand how this method works for sorting an array alphabetically, but it seems to work
    sort(materials): [] {
      const copy = materials;
      copy.sort( (a, b) => {
        const textA = a.title.toLocaleLowerCase();
        const textB = b.title.toLocaleLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      return copy;
    }

}




