import React, { useState,memo } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3";
import {myCred} from "../core/aws/cred";

import { RNS3 } from 'react-native-s3-upload';
// import {
// 	TranscribeClient,
//   	StartTranscriptionJobCommand,
// } from "@aws-sdk/client-transcribe";

import {GetTranscriptionJobCommand, TranscribeClient, CreateLanguageModelCommand, StartTranscriptionJobCommand, ListTranscriptionJobsCommand } from "@aws-sdk/client-transcribe";

import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

const AwsScreen = ({ navigation }) => {
	
	const driveLink=navigation.getParam('driveLink');

  	const [bucketName, setBucketName] = useState("");
	const [successMsg, setSuccessMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	// https://finalprojectbucket123.s3.us-east-2.amazonaws.com/L02.1+Lecture+Overview.mp3
	const [audioPath,setAudioPath]=useState("");

	//   Testing Other AWS Transcribe
	  	// Start of AWS Transcribe Parameters
	const REGION = "us-east-2"

	
		


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
		const testAudioPath="C:/Users/Admin/Desktop/ClassNotes/src/assets/audio/";
		
		// For Uploading to S3
		const audioFile = {
		// `uri` can also be a file system path (i.e. file://)
			uri: "https://finalprojectbucket123.s3.us-east-2.amazonaws.com/L02.1+Lecture+Overview.mp3",
			name: "testAudio.mp3",
			type: "audio/mpeg"
		}
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

	  const startTranscription = async () =>{
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
											MediaFormat: "mp3", // For example, 'wav'
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

				// console.log(response.body.postResponse.location)
				// console.log("Audio Path",audioPath);
			})
		  
	  };
	
	  const deleteBucket = async () => {
	    setSuccessMsg("");
	    setErrorMsg("");
	
	    try {
	      await client.send(new DeleteBucketCommand({ Bucket: bucketName }));
	      setSuccessMsg(`Bucket "${bucketName}" deleted.`);
	    } catch (e) {
	      setErrorMsg(e);
	    }
	  };

    return (
	    <View style={styles.container}>
	      <Text style={{ color: "green" }}>
	        {successMsg ? `Success: ${successMsg}` : ``}
	      </Text>
	      <Text style={{ color: "red" }}>
	        {errorMsg ? `Error: ${errorMsg}` : ``}
	      </Text>
	      <View>


			<Button
	          backroundColor="#68a0cf"
	          title="Create Transcription job"
	          onPress={startTranscription}
	        />

	      </View>
	    </View>
	  );
  
};
const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    alignItems: "center",
	    justifyContent: "center",
	  },
	});

export default memo(AwsScreen);

