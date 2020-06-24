import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';


import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();


@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {
   // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  signatureEndpoint = 'https://unah-zoom.herokuapp.com'
  apiKey = '6I8c_5CSTj21PCHz8GnhOw'
  meetingNumber = 93836305128
  role = 0
  leaveUrl = 'http://localhost:4200'
  userName = 'Sifuma'
  userEmail = 'grace.sifuma@vitafluence.ai'
  passWord = 'Pombebangi123'
   
 
   constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {
 
   }
 
   ngOnInit() {
 
   }
 
   getSignature() {
     this.httpClient.post(this.signatureEndpoint, {
       meetingNumber: this.meetingNumber,
       role: this.role
     }).toPromise().then((data: any) => {
       console.log('......',data);
       if(data.signature) {
         console.log(data.signature)
         this.startMeeting(data.signature)
       } else {
         console.log(data)
       }
     }).catch((error) => {
       console.log(error)
     })
   }
 
   startMeeting(signature) {
 
     document.getElementById('zmmtg-root').style.display = 'block'
 
     ZoomMtg.init({
      leaveUrl: this.leaveUrl,
      isSupportAV: true,
       success: (success) => {
         console.log(success)
 
         ZoomMtg.join({
           signature: signature,
           meetingNumber: this.meetingNumber,
           userName: this.userName,
           apiKey: this.apiKey,
           userEmail: this.userEmail,
           passWord: this.passWord,
           success: (success) => {
             console.log(success)
           },
           error: (error) => {
             console.log(error)
           }
         })
 
       },
       error: (error) => {
         console.log(error)
       }
     })
   }

}
