import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";
// import * as React from 'react'
import { View,Text } from 'react-native';
// import Pdf from 'react-native-pdf';
// import PDFReader from 'rn-pdf-reader-js'

import PDFView from 'react-native-view-pdf';

const resources = {
  // file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
  url: 'https://firebasestorage.googleapis.com/v0/b/classnotes-27610.appspot.com/o/MCC%2F1708.04439.pdf?alt=media&token=fb3f7bfe-5374-42e1-b3e2-825b9bb3d83c',
  // base64: 'JVBERi0xLjMKJcfs...',
};
const AllFiles = ({ navigation }) =>{
  const resourceType = 'url';
  return (
     // const source = {uri:'https://arxiv.org/pdf/1708.04439.pdf',cache:true};

      <Background>
      {/* <Logo /> */}
      {/* <Header>MCC Subject Files</Header> */}
      {/* <Paragraph>
        All Files Uploaded by Teacher will be seen here.
      </Paragraph> */}
      {/* <Text >
          Values passed from First page: {navigation.params.paramKey}
      </Text> */}


      <View style={{ flex: 1 }}>
          {/* Some Controls to change PDF resource */}
            <Paragraph>
            Important Document for UNIT TEST 2
          </Paragraph>
          <PDFView
            // fadeInDuration={250.0}
            style={{ flex: 1 }}
            resource={resources[resourceType]}
            resourceType={resourceType}
            onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
            onError={() => console.log('Cannot render PDF', error)}
          />
        </View>

      {/* <View style={styles.container}>
          <Pdf
              source={{uri:'https://arxiv.org/pdf/1708.04439.pdf',cache:true}}
              onLoadComplete={(numberOfPages,filePath)=>{
                  console.log(`number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page,numberOfPages)=>{
                  console.log(`current page: ${page}`);
              }}
              onError={(error)=>{
                  console.log(error);
              }}
              onPressLink={(uri)=>{
                  console.log(`Link presse: ${uri}`)
              }}
              style={styles.pdf}/>
      </View> */}

      {/* <PDFReader
          source={{
            uri: 'https://arxiv.org/pdf/1708.04439.pdf',
          }}
        /> */}

      {/* <Button mode="outlined" onPress={() => logoutUser()}>
        Logout
      </Button> */}

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

export default memo(AllFiles);
