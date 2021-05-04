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
const VideoCallStart = ({ navigation }) =>{

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());

    const initialState = {
      isAudioEnabled: true,
      status: 'disconnected',
      participants: new Map(),
      videoTracks: new Map(),
      userName: '',
      roomName: '',
      token: '',
    };

  const AppContext = React.createContext(initialState);
    
  const twilioVideo = useRef(null);
  
  const {props, setProps} = useContext(AppContext);

  const jwt = navigation.getParam('jwt');
  useEffect(() => {
    twilioVideo.current.connect({
      // roomName: props.roomName,
      // accessToken: props.token,
      roomName: "MCC",
      accessToken: jwt,
    });
    setProps({...props, status: 'connecting'});
    return () => {
      _onEndButtonPress();
    };
  }, []);

  // const _onEndButtonPress = () => {
  //   twilioVideo.current.disconnect();
  //   setProps(initialState);
  // };

  // const _onMuteButtonPress = () => {
  //   twilioVideo.current
  //     .setLocalAudioEnabled(!props.isAudioEnabled)
  //     .then((isEnabled) => setProps({...props, isAudioEnabled: isEnabled}));
  // };

  // const _onFlipButtonPress = () => {
  //   twilioVideo.current.flipCamera();
  // };
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


    return(


//  <Background>
      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={() => {
          console.log("Connected");
          <TwilioVideoParticipantView
                  // style={styles.remoteVideo}
                  // key={trackSid}
                  // trackIdentifier={trackIdentifier}
            />
          // setProps({...props, status: 'connected'});
        }}
        onRoomDidDisconnect={() => {
          // setProps({...props, status: 'disconnected'});
          navigation.goBack();
        }}
        onRoomDidFailToConnect={(error) => {
          Alert.alert('Error', error.error);
          // setProps({...props, status: 'disconnected'});
          navigation.goBack();
        }}
        // onParticipantRemovedVideoTrack={({track}) => {
        //   const videoTracks = props.videoTracks;
        //   videoTracks.delete(track.trackSid);
        //   setProps({...props, videoTracks});
        // }}
      />

          /* <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.button} onPress={_onEndButtonPress}>
          <Text style={styles.buttonText}>End</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_onMuteButtonPress}>
          <Text style={styles.buttonText}>
            {props.isAudioEnabled ? 'Mute' : 'Unmute'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_onFlipButtonPress}>
          <Text style={styles.buttonText}>Flip</Text>
        </TouchableOpacity>
      </View> */

    // </Background>


    );
};
const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'lightgrey',
//     flexDirection: 'row',
//   },
//   form: {
//     flex: 1,
//     alignSelf: 'center',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     margin: 20,
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   formGroup: {
//     margin: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   textInput: {
//     padding: 5,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: 'lightgrey',
//   },
//   callContainer: {
//     flex: 1,
//   },
//   callWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   remoteGrid: {
//     flex: 1,
//   },
  remoteVideo: {
    flex: 1,
  },
//   localVideo: {
//     position: 'absolute',
//     right: 5,
//     bottom: 50,
//     width: dimensions.width / 4,
//     height: dimensions.height / 4,
//   },
//   optionsContainer: {
//     position: 'absolute',
//     paddingHorizontal: 10,
//     left: 0,
//     right: 0,
//     bottom: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
});
export default memo(VideoCallStart);
