import React, { memo,useEffect } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Background from "../components/Background";
import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3";
import {myCred} from "../core/aws/cred";
import {GetTranscriptionJobCommand, TranscribeClient, CreateLanguageModelCommand, StartTranscriptionJobCommand, ListTranscriptionJobsCommand } from "@aws-sdk/client-transcribe";

import { RNS3 } from 'react-native-s3-upload';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import AudioRecorderPlayer, {
 AVEncoderAudioQualityIOSType,
 AVEncodingOption,
 AudioEncoderAndroidType,
 AudioSet,
 AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';


const VideoCall = ({ navigation }) => {

    const paramsGetJob = {
        TranscriptionJobName: "CompleteJob", // Required for Deleting Jobs
      };

		const client = new TranscribeClient({ 
			region: "us-east-2",
			credentials:{
				accessKeyId: myCred.accessKeyId,
    			secretAccessKey: myCred.secretAccessKey
			}
		});

    const options = {
			keyPrefix: "uploads/",
			bucket: "finalprojectbucket123",
			region: "us-east-2",
			accessKey: myCred.accessKeyId,
			secretKey: myCred.secretAccessKey,
			successActionStatus: 201
		  }

    const GetTranscriptionJob=async ()=>{
		  try{
			  console.log("Entered GetTranscriptionJob Command");
			const myData = await client.send(new GetTranscriptionJobCommand(paramsGetJob));

			const url= myData.TranscriptionJob.Transcript.TranscriptFileUri;
			// console.log("Return Url of Json Document",url)
			// console.log("This is Url",url);

			// Send Data to Flask Server
			fetch(url, {method: "GET"})
			.then((response) => response.json())
			.then((responseData) => {
				const extractedText = responseData['results']['transcripts'][0]['transcript'];
				
				// Send Extracted Text to Flask API
				// fetch('http://c52a45f89263.ngrok.io', {
				// method: 'POST',
				// headers: {
				//   Accept: 'application/json',
				//   'Content-Type': 'application/json'
				// },
				// body: JSON.stringify({
				//   textString: extractedText,
				//   driveLink: driveLink,
				//   })
				// })
				// .then((response) => console.log(response));

				// console.log(extractedText,driveLink);
				console.log("This is the complete Extracted Text",extractedText);
		  })
		}
		  catch (err){
			console.log("Error",err);
		  }
	  };

    onStartRecord = async () => {
    const path='sdcard/audio.mp3';
    global.audioRecorderPlayer = new AudioRecorderPlayer();
    const result = await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {

      return;
    });
    // console.log(result);
  };

  onStopRecord = async () => {
    var result = await audioRecorderPlayer.stopRecorder();
    global.audioRecorderPlayer.removeRecordBackListener();
    const audioLocalUrl=result;

    const audioFile = {
      // `uri` can also be a file system path (i.e. file://)
        uri: audioLocalUrl,
        name: "finalAudio.mp4",
        type: "audio/mpeg"
      }
		
    console.log("Uploading to s3 bucket")
			RNS3.put(audioFile, options).then(response => {
				if (response.status !== 201)
				{
				  throw new Error("Failed to upload audio to S3");
				}

				// setAudioPath(response.body.postResponse.location);
				const returnedAudioPath=response.body.postResponse.location;
        
        const paramsCreateJob = {
											TranscriptionJobName: "CompleteJob",
											LanguageCode: "en-US", // For example, 'en-US'
											MediaFormat: "mp4", // For example, 'wav'
											Media: {
												MediaFileUri: returnedAudioPath,
												// For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
											}
										};

        console.log("Starting Transcription Job")
				client.send(new StartTranscriptionJobCommand(paramsCreateJob)).
					then((response)=>{
						// console.log(response);
						console.log("Waiting for 1 minute")
						setTimeout(GetTranscriptionJob,60000);
					}).catch(error=>{
						console.log("Start Transcription Error",error);
					});
                
      })
  // console.log(result);
};

    return (
      <Background>
	    <Button mode="contained" onPress={this.onStartRecord}>
      Start Audio
      </Button>

      <Button mode="contained" onPress={onStopRecord}>
      Stop Audio
      </Button>
      </Background>

	  );
  
};

export default memo(VideoCall);
