import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { NavController, AlertController,ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  photo: Photo;
  private image: string;
  lat : any;
  log : any;
 
  constructor(public navCtrl: NavController,
              private camera: Camera,
              public geolocation: Geolocation,
              public alertCtrl: AlertController,
              private domSanitizer: DomSanitizer, 
              private toast: ToastController,
              private userProvider: UsersProvider
              ){
  }

  getPhoto() {

        this.userProvider.getFirstPhoto().then((result: any) => {
            this.photo = result;
            this.lat = this.photo.lat;
            this.log = this.photo.log;
            this.image = this.photo.photoBase64;
        }).catch((error: any) => {
           this.toast.create({ message: 'Erro ao listar os dados . Erro: ' + error, position: 'botton', duration: 3000 }).present();
        });
  }

  getAllPhotos() {
       

        this.userProvider.getAllPhotos().then((result: any) => {
            this.photo = result[0];
            this.lat = this.photo.lat;
            this.log = this.photo.log;
            this.image = this.photo.photoBase64;
            
        }).catch((error: any) => {
          this.toast.create({ message: 'Erro ao listar os dados . Erro: ' + error, position: 'botton', duration: 3000 }).present();
        });
  }

  savePhoto() {
        this.userProvider.savePhoto(this.lat, this.log, this.image).then((result: any) => {
            this.toast.create({ message: 'Foto salva com sucesso. Token: ' + result.token, position: 'botton', duration: 3000 }).present();
        }).catch((error: any) => {
          this.toast.create({ message: 'Erro ao listar os dados . Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
        });
  }

  editFirstPhoto() {
        this.userProvider.update(this.lat, this.log, this.image).then((result: any) => {
            this.AlertAplication('Sucesso','dados Salvo com sucesso');
          }).catch((error: any) => {
            this.toast.create({ message: 'Erro ao editar dados Foto. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
        });
    }

  deleteDateOnTheScreen() {
        this.lat = '';
        this.log = '';
        this.image = "Tire outra foto";
  }

  onTakePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            //saveToPhotoAlbum: true,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            targetWidth: 100,
            targetHeight: 100
        }

        this.camera.getPicture(options).then((imageData) => {
            this.image = 'data:image/jpeg;base64,'+imageData;
        },(err) => {
             this.AlertAplication('Sinto muito','Não foi possivél captura a Foto');
        });
  }

  onTakeYourPositionInGlobe() {
        this.geolocation.getCurrentPosition().then((resp) => {
         
        }).catch((error) => {
            console.log('Error getting location', error);
            this.AlertAplication('Sinto muito','Não foi possivél capturar geolocalizacao');
        });
        
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
          this.lat = data.coords.latitude
          this.log = data.coords.longitude
        });
  }

  AlertAplication(title,mesagem){
        let alert = this.alertCtrl.create({
          title: title ,
          subTitle: mesagem ,
          buttons: ['OK']
        });
        alert.present();
  }
  
}

export class Photo {
  lat: string;
  log: string;
  photoBase64: string;
}
