import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from  '@ionic-native/file-transfer';
import { Http } from '@angular/http';
import { GlobalProvider } from '../../providers/global/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  phoneno:string;
  myphoto:any;
  districts=['Harare','Bulawayo','Buhera','Chimanimani','Chipinge','Makoni','Mutare','Mutasa','Nyanga','Bindura','Guruve','Mozowe','Mount Darwin','Mukumbura','Muzarabani','Shamva','Chikomba','Goromonzi','Hwedza','Marondera','Mudzi','Murehwa','Mutoko','Seke','UMP','Chegutu','Hurungwe','Kadoma','Kariba','Guruve','Makonde','Zvimba','Bikita','Chiredzi','Chivhu','Gutu','Masvingo','Mwenezi','Zaka','Binga','Bubi','Hwange','Lupane','Knayi','Tsholotsho','Umguza','Beitbridge','Bulilimangwe','Gwanda','Insiza','Matobo','Umzingwane','Chirumanzu','Gwokwe North','Gwokwe South','Gweru',' Kwekwe','Mberengwa','Shurugwi','Zvishavane'];
  private signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,public global: GlobalProvider, private transfare: FileTransfer, private loadingCtrl: LoadingController, public camera: Camera, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public http: Http) {
    var validators={
      "phoneno":[Validators.required,Validators.pattern("[0-9]{10}")],
      "company":[Validators.required,Validators.maxLength(15),Validators.minLength(2)],
      "name":[Validators.required,Validators.pattern("[A-Za-z\s]{2,20}")],
      "password":[Validators.required,Validators.minLength(8),Validators.maxLength(20)]
    };
    this.signupForm=this.formBuilder.group({
      phoneno: ['',validators.phoneno],
      company: ['',validators.company],
      type: ['',Validators.required],
      firstname: ['',validators.name],
      lastname: ['',validators.name],
      district: ['',Validators.required],
      password: ['',validators.password],
      form: ['']
    });
  }
  signUp() {
    if(this.signupForm.valid){
      this.http.post(this.global.serverAddress+"/api/signup.php", JSON.stringify(this.signupForm.value))
        .subscribe(data => {
          console.log(data["_body"]);
          let response = JSON.parse(data["_body"]);
          this.getPhoto();
          if(response.response=="success"){
             let alert = this.alertCtrl.create({
                title: 'Signup',
                subTitle: 'Account successfully created!',
                buttons: ['OK']
            });
             alert.present();
            this.navCtrl.pop();
          }else{
            let alert = this.alertCtrl.create({
                title: 'Signup',
                subTitle: 'Phone number or Company Name is already taken!',
                buttons: ['OK']
            });
            alert.present();
         }
        }, error => {
          console.log("Oooops!");
        }
      );
    }else{
        let alert = this.alertCtrl.create({
            title: 'Signup',
            subTitle: 'Please fill in valid form data!',
            buttons: ['RETRY']
        });
        alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  //destinationType: this.camera.DestinationType.FILE_URI,
  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
     this.uploadImage();
    }, (err) => {
     // Handle error
    });
  }

  uploadImage(){
    //show loading
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    //create file transfare object
    const fileTransfare: FileTransferObject=this.transfare.create();
    //option transfare
    let options: FileUploadOptions={
      fileKey: 'photo',
      fileName: this.phoneno+".jpg",
      chunkedMode: false,
      httpMethod: "post",
      mimeType: "image/jpeg",
      headers: {}
    }
    //file transfare action
    fileTransfare.upload(this.myphoto, this.global.serverAddress+"api/upload.php", options)
      .then((data) =>{
        alert("success");
        loader.dismiss();
      }, (err)=> {
        console.log(err);
        alert("Error");
        loader.dismiss();
      });
  }

  getPhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myphoto = 'data:image/jpeg;base64,' + imageData;
     this.uploadImage();
    }, (err) => {
     // Handle error
    });
  }

}
