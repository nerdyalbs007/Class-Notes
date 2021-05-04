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

const TP = ({ navigation }) =>{
    
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

      const {props, setProps} = useContext(AppContext);
        
    return(
  <Background>

    {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
            <View style={styles.formGroup}>
                <Text style={styles.text}>User Name</Text>
                <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                value={props.userName}
                onChangeText={(text) => setProps({...props, userName: text})}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.text}>Room Name</Text>
                <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                value={props.roomName}
                onChangeText={(text) => setProps({...props, roomName: text})}
                />
            </View>
            // <View style={styles.formGroup}>
            //     <TouchableOpacity
            //     disabled={false}
            //     style={styles.button}
            //     onPress={() => {
            //         fetch(`https://51f505bdec94.ngrok.io/getToken?userName=${props.userName}`)
            //             .then((response) => {
            //             if (response.ok) {
            //                 response.text().then((jwt) => {
            //                 setProps({...props, token: jwt});
            //                 navigation.navigate('VideoCallStart');
            //                 return true;
            //                 });
            //             } else {
            //                 response.text().then((error) => {
            //                 Alert.alert(error);
            //                 });
            //             }
            //             })
            //             .catch((error) => {
            //             console.log('error', error);
            //             Alert.alert('API not available');
            //             });
            //     }}>
            //     <Text style={styles.buttonText}>Connect to Video Call</Text>
            //     </TouchableOpacity>
            // </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView> */}
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
            <View>
            <View>
                <Text>User Name</Text>
                <TextInput
                autoCapitalize="none"
                // value={props.userName}
                onChangeText={(text) => setProps({...props, userName: "MCC"})}
                />
            </View>
            <View >
                <Text>Room Name</Text>
                <TextInput
                autoCapitalize="none"
                // value={props.roomName}
                onChangeText={(text) => setProps({...props, roomName: "123"})}
                />
            </View>
            <View>
                <TouchableOpacity
                disabled={false}
                onPress={() => {
                    fetch(`https://8d9608e7e5a9.ngrok.io/getToken?userName=MCC`)
                        .then((response) => {
                        if (response.ok) {
                            response.text().then((jwt) => {
                            setProps({...props, token: jwt});
                            navigation.navigate('VideoCallStart');
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
            </View>
        </ScrollView>
        </KeyboardAvoidingView>


  </Background>
    );
};

export default memo(TP);
