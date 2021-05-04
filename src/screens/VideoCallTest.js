// import React, { memo } from "react";
import React, {useState, useRef, useEffect, useContext, memo} from 'react';

import Button from "../components/Button";

import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
  } from 'react-native';
import Background from "../components/Background";
import {
TwilioVideoLocalView,
TwilioVideoParticipantView,
TwilioVideo,
} from 'react-native-twilio-video-webrtc';
const dimensions = Dimensions.get('window');
const VideoCallTest = ({ navigation }) =>{

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const jwt = navigation.getParam('jwt');
  const [token, setToken] = useState(jwt);
  const twilioRef = useRef(null);


//   const jwt = navigation.getParam('jwt');
  useEffect(() => {
    twilioRef.current.connect({ accessToken: token });
    setStatus('connecting');
  }, []);


  
  const _onEndButtonPress = () => {
    twilioRef.current.disconnect();
  };

  const _onMuteButtonPress = () => {
    twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioRef.current.flipCamera();
  };

  const _onRoomDidConnect = ({roomName, error}) => {
    console.log('onRoomDidConnect: ', roomName);

    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({ roomName, error }) => {
    console.log('[Disconnect]ERROR: ', error);

    setStatus('disconnected');
    navigation.goBack();
  };

  const _onRoomDidFailToConnect = error => {
    console.log('[FailToConnect]ERROR: ', error);

    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track.trackSid);

    setVideoTracks(videoTracksLocal);
  };


    return(


        <View style={styles.container}>
      {/* {
        status === 'disconnected' &&
        <View>
          <Button
            title="Connect"
            style={styles.button}
            onPress={_onConnectButtonPress}>
          </Button>
        </View>
      } */}

      {
        (status === 'connected' || status === 'connecting') &&
          <View style={styles.callContainer}>
          {
            status === 'connected' &&
            <View style={styles.remoteGrid}>
              {
                Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                  return (
                    <TwilioVideoParticipantView
                      style={styles.remoteVideo}
                      key={trackSid}
                      trackIdentifier={trackIdentifier}
                    />
                  )
                })
              }
            </View>
          }
          <View
            style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onEndButtonPress}>
              <Text style={{fontSize: 12}}>End</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onMuteButtonPress}>
              <Text style={{fontSize: 12}}>{ isAudioEnabled ? "Mute" : "Unmute" }</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onFlipButtonPress}>
              <Text style={{fontSize: 12}}>Flip</Text>
            </TouchableOpacity>
            <TwilioVideoLocalView
              enabled={true}
              style={styles.localVideo}
            />
          </View>
        </View>
      }

      <TwilioVideo
        ref={ twilioRef }
        onRoomDidConnect={ _onRoomDidConnect }
        onRoomDidDisconnect={ _onRoomDidDisconnect }
        onRoomDidFailToConnect= { _onRoomDidFailToConnect }
        onParticipantAddedVideoTrack={ _onParticipantAddedVideoTrack }
        onParticipantRemovedVideoTrack= { _onParticipantRemovedVideoTrack }
      />
    </View>


    );
};
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
  },
callContainer: {
flex: 1,
position: "absolute",
bottom: 0,
top: 0,
left: 0,
right: 0,
},
welcome: {
fontSize: 30,
textAlign: "center",
paddingTop: 40,
},
input: {
height: 50,
borderWidth: 1,
marginRight: 70,
marginLeft: 70,
marginTop: 50,
textAlign: "center",
backgroundColor: "white",
},
button: {
marginTop: 100,
},
localVideo: {
width: 125,
height: 200,
position: "absolute",
right: 10,
bottom: 400,
borderRadius: 2,
borderColor: "#4e4e4e",
},
remoteGrid: {
flex: 1,
flexDirection: "row",
flexWrap: "wrap",
},
remoteVideo: {
width: "100%",
height: "100%",
},
optionsContainer: {
position: "absolute",
left: 0,
bottom: 0,
right: 0,
height: 100,
flexDirection: "row",
alignItems: "center",
justifyContent: "center",
},
optionButton: {
width: 60,
height: 60,
marginLeft: 10,
marginRight: 10,
borderRadius: 100 / 2,
backgroundColor: "grey",
justifyContent: "center",
alignItems: "center",
},
})
export default memo(VideoCallTest);
