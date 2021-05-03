import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
// import * as React from 'react'
import { View,Text,Image } from 'react-native';
// import Pdf from 'react-native-pdf';
// import PDFReader from 'rn-pdf-reader-js'

import PDFView from 'react-native-view-pdf';

const resources = {
  // file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
  url: 'https://firebasestorage.googleapis.com/v0/b/classnotes-27610.appspot.com/o/MCC%2F1708.04439.pdf?alt=media&token=fb3f7bfe-5374-42e1-b3e2-825b9bb3d83c',
  // base64: 'JVBERi0xLjMKJcfs...',
};
const AllFilesImg = ({ navigation }) =>{
  const resourceType = 'url';
  return (
     // const source = {uri:'https://arxiv.org/pdf/1708.04439.pdf',cache:true};

      <Background>
      

      <View style={{ flex: 1 }}>
          <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/classnotes-27610.appspot.com/o/MCC%2FWhatsApp%20Image%202020-11-24%20at%2010.36.04%20AM.jpeg?alt=media&token=3faa0c6c-4126-4ad5-ac78-62aa167ff4e2'}} style={{width: 400, height: 400}}/>
        </View>
    </Background>
  );

}; 

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 25,
//     },
//     pdf: {
//         flex:1,
//         width:Dimensions.get('window').width,
//         height:Dimensions.get('window').height,
//     }
// });

export default memo(AllFilesImg);
