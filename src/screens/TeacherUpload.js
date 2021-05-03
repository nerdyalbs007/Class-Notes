// import React, { memo } from "react";
// import Background from "../components/Background";
// import Logo from "../components/Logo";
// import Header from "../components/Header";
// import Paragraph from "../components/Paragraph";
// import Button from "../components/Button";
// import { logoutUser } from "../api/auth-api";

// const TeacherUpload = ({ navigation }) => (
//   <Background>
//     {/* <Logo /> */}
//     <Paragraph>THIS IS TEACHER UPLOAD</Paragraph>

//   </Background>
// );

// export default memo(TeacherUpload);

import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
import { render } from "react-dom";
import fs from "react-native-fs";


// import React from "react";
import {
    StyleSheet,
    View,
    Image,
    ActivityIndicator,
    Platform,
    SafeAreaView,
    Text,
} from "react-native";
// import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

export default class TeacherUpload extends React.Component{
     state = {
        // placeholder image
        imagePath: require("./img/default.png"),
        isLoading: false,
        status: '',
    }
    chooseFile = () => {
        this.setState({ status: '' });
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true, // do not backup to iCloud
                path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker', storage());
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let path = this.getPlatformPath(response).value;
                let fileName = this.getFileName(response.fileName, path);
                this.setState({ imagePath: path });
                this.uploadImageToStorage(path, fileName);
            }
        });
    };
    

     uploadImageToStorage(path, name) {
        //  console.log(path);
        this.setState({ isLoading: true });
        // fs.readFile("file://"+path,'base64')
        // .then((res => {             //conversion of image to base64
        //     console.log(res);
        //     GDrive.files.createFileMultipart(
        //             res,
        //             "'image/jpg'", {
        //             parents: ["root"], //or any path
        //             name: "photo.jpg"
        //         },
        //             true)              //make it true because you are passing base64 string otherwise the uploaded file will be not supported
        //             .then(a=>{
        //             console.log(a);
        //         });
        //         }
        //         );
        // let reference = storage().ref(name);
        setTimeout(function(){
             this.setState({isLoading: false, status: 'Image uploaded successfully'});
        }.bind(this),5000);
        // this.setState({ isLoading: false, status: 'Image uploaded successfully' });
        // let task = reference.putFile(path);
        // task.then(() => {
        //     console.log('Image uploaded to the bucket!');
        //     this.setState({ isLoading: false, status: 'Image uploaded successfully' });
        // }).catch((e) => {
        //     status = 'Something went wrong';
        //     console.log('uploading image error => ', e);
        //     this.setState({ isLoading: false, status: 'Something went wrong' });
        // });
    }
    
    getFileName(name, path) {
        if (name != null) { return name; }

        if (Platform.OS === "ios") {
            path = "~" + path.substring(path.indexOf("/Documents"));
        }
        return path.split("/").pop();
    }
    /**
     * Get platform specific value from response
     */
    getPlatformPath({ path, uri }) {
        return Platform.select({
            android: { "value": path },
            ios: { "value": uri }
        })
    }

    getPlatformURI(imagePath) {
        let imgSource = imagePath;
        if (isNaN(imagePath)) {
            imgSource = { uri: this.state.imagePath };
            if (Platform.OS == 'android') {
                imgSource.uri = "file:///" + imgSource.uri;
            }
        }
        return imgSource
    }

    render(){
        // Uncomment below two lines
        let { imagePath } = this.state;
        let imgSource = this.getPlatformURI(imagePath)
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
                <View style={styles.imgContainer}>
                    <Text style={styles.boldTextStyle}>{this.state.status}</Text>
                    <Image style={styles.uploadImage} source={imgSource} />
                    <View style={styles.eightyWidthStyle} >
                        <Button title={'Upload Image'} onPress={this.chooseFile}>Upload File</Button>
                    </View>
                </View>
            </SafeAreaView>
        //     <Background>
             
        //    </Background>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    eightyWidthStyle: {
        width: '80%',
        margin: 2,
    },
    uploadImage: {
        width: '80%',
        height: 300,
    },
});

// export default memo(TeacherUpload);

// import React from "react";
// import {
//     StyleSheet,
//     View,
//     Button,
//     Image,
//     ActivityIndicator,
//     Platform,
//     SafeAreaView,
//     Text,
// } from "react-native";
// import storage from '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-picker';
// export default class App extends React.Component {

   

//     chooseFile = () => {
//         var options = {
//             title: 'Select Image',
//             storageOptions: {
//                 skipBackup: true, // do not backup to iCloud
//                 path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
//             },
//         };
//         ImagePicker.showImagePicker(options, response => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker', storage());
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             } else {
//                 let path = this.getPlatformPath(response).value;
//                 let fileName = this.getFileName(response.fileName, path);
//                 this.setState({ imagePath: path });
//             }
//         });
//     };

//     /**
//      * Get the file name and handle the invalid null case
//      */
//     getFileName(name, path) {
//         if (name != null) { return name; }

//         if (Platform.OS === "ios") {
//             path = "~" + path.substring(path.indexOf("/Documents"));
//         }
//         return path.split("/").pop();
//     }

//     /**
//      * Get platform specific value from response
//      */
//     getPlatformPath({ path, uri }) {
//         return Platform.select({
//             android: { "value": path },
//             ios: { "value": uri }
//         })
//     }

//     /**
//      * Get platform-specific Uri with the required format
//      */
//     getPlatformURI(imagePath) {
//         let imgSource = imagePath;
//         if (isNaN(imagePath)) {
//             imgSource = { uri: this.state.imagePath };
//             if (Platform.OS == 'android') {
//                 imgSource.uri = "file:///" + imgSource.uri;
//             }
//         }
//         return imgSource
//     }

//     render() {
//         let { imagePath } = this.state;
//         let imgSource = this.getPlatformURI(imagePath)
//         return (
//             <SafeAreaView style={styles.container}>
//                 <View style={styles.imgContainer}>
//                     <Image style={styles.uploadImage} source={imgSource} />
//                     <View style={styles.eightyWidthStyle} >
//                         <Button title={'Upload Image'} onPress={this.chooseFile}></Button>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#e6e6fa',
//     },
//     imgContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'absolute',
//         width: '100%',
//         height: '100%'
//     },
//     eightyWidthStyle: {
//         width: '80%',
//         margin: 2,
//     },
//     uploadImage: {
//         width: '80%',
//         height: 300,
//     },
// });