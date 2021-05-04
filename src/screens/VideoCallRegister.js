// import React, { memo } from "react";
import React, {useState, useRef, useEffect, useContext, memo} from 'react';
import Background from "../components/Background";
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

import {
TwilioVideoLocalView,
TwilioVideoParticipantView,
TwilioVideo,
} from 'react-native-twilio-video-webrtc';

const VideoCallRegister = ({ navigation }) =>{
    
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
      
      const dimensions = Dimensions.get('window');

        
    return(
        <Background>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
                        
            <View>
                <TouchableOpacity
                disabled={false}
                onPress={() => {
                    fetch(`https://55c53f100486.ngrok.io/getToken?userName=MCC`)
                        .then((response) => {
                        if (response.ok) {
                            response.text().then((jwt) => {
                            // setProps({...props, token: jwt});
                            navigation.navigate('VideoCallTest',{
                                jwt:jwt
                            });
                            return true;
                            });
                        } else {
                            response.text().then((error) => {
                                console.log(error);
                            // Alert.alert(error);
                            });
                        }
                        })
                        .catch((error) => {
                        console.log('error', error);
                        Alert.alert('API not available');
                        });
                }}>
                <Text>Connect to Video Call</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </Background>

    );
};

export default memo(VideoCallRegister);
