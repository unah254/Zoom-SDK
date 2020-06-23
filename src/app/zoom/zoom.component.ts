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
   signatureEndpoint = ''
   apiKey = '6I8c_5CSTj21PCHz8GnhOw'
   meetingNumber = 123456789
   role = 0
   leaveUrl = 'http://localhost:4200'
   userName = 'Unah'
   userEmail = ''
   passWord = ''
 
   constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document) {
 
   }
 
   ngOnInit() {
 
   }
 
   getSignature() {
     this.httpClient.post(this.signatureEndpoint, {
       meetingNumber: this.meetingNumber,
       role: this.role
     }).toPromise().then((data: any) => {
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
       debug: true, //optional
       showMeetingHeader: false, //option
       disableInvite: false, //optional
       disableCallOut: false, //optional
       disableRecord: false, //optional
       disableJoinAudio: false, //optional
       audioPanelAlwaysOpen: true, //optional
       showPureSharingContent: false, //optional
       isSupportAV: true, //optional,
       isSupportChat: true, //optional,
       isSupportQA: true, //optional,
       isSupportCC: true, //optional,
       screenShare: true, //optional,
       rwcBackup: '', //optional,
       videoDrag: true, //optional,
       sharingMode: 'both', //optional,
       videoHeader: true, //optional,
       isLockBottom: true, // optional,
       isSupportNonverbal: true, // optional,
       isShowJoiningErrorDialog: true, // optional,
       inviteUrlFormat: '', // optional
       loginWindow: {  // optional,
          width: 400,
          height: 380
         },
       success: (success) => {
         console.log(success)
 
         ZoomMtg.join({
           signature: "Nkk4Y181Q1NUajIxUENIejhHbmhPdy4xMjM0NTY3ODkuMTU5MjkyNTkzMzE3Mi4wLlN1ZmJRNVF5M2RPS3V2cFVYRjlJUCtFbHRoeGJvRGFtOTRnVi9BVmIxVFk9",
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
