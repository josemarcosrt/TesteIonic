import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
 
@Injectable()
export class UsersProvider {
  private API_URL = 'https://api-restdesafio.herokuapp.com/api/'
 
  constructor(public http: Http, private toast: ToastController) { }

  savePhoto(lat: string, log: string,photoBase64: string) {
    return new Promise((resolve, reject) => {
      var data = {
          lat: lat,
          log: log,
          photoBase64: photoBase64
      };

      this.http.post(this.API_URL + 'savePhoto', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  update(lat: string, log: string,photoBase64: string) {

    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'atualizarPhoto';
      var data = {
          id: 1,
          lat: lat,
          log: log,
          photoBase64: photoBase64
      };
      this.http.put(url,data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
 
  get(id: number) {
    return new Promise((resolve, reject) => {
      let url = this.API_URL+'photo/'+id;
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  getFirstPhoto() {
    return new Promise((resolve, reject) => {
      let url = this.API_URL + 'photo/1';
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  getAllPhotos() {
    return new Promise((resolve, reject) => {
 
      let url = this.API_URL + 'photo';
      
      this.http.get(url)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
  
}
