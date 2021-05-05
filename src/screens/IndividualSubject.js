import React, { memo } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import {SafeAreaView, StyleSheet, View, Text,Linking} from 'react-native';
const IndividualSubject = ({navigation }) => {
  // const {subjectName} = route.params;
  const subjectName = navigation.getParam('subjectName');
  const driveLink = navigation.getParam('driveLink');
  return(

  <Background>
    {/* <Logo /> */}
    <Header>Subject Name -  {subjectName}</Header>
    {/* <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph> */}

    {/* <Text>
      Subject Name : {JSON.stringify( subjectName )}
    </Text> */}
    <Button mode="contained" onPress={()=>{
      navigation.navigate('VideoCallTest',{
        jwt:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2M3NjQwMDc1OGE4NWZjOGYxNGIwY2M4NTlkZTRmZDc5LTE2MjAxOTA3MjQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJKaW1teSIsInZpZGVvIjp7fX0sImlhdCI6MTYyMDE5MDcyNCwiZXhwIjoxNjIwMTk0MzI0LCJpc3MiOiJTS2M3NjQwMDc1OGE4NWZjOGYxNGIwY2M4NTlkZTRmZDc5Iiwic3ViIjoiQUNhYmQyMGEwZDQwN2ZhZTFmOTY1YmVmNWNlMGFmYmZhMCJ9.bAEl-NnruxUv3pSQeHp7UspQt6YS3vwDygZh388WtiY"
    });
    }}>
      Go To Live Lecture
    </Button>
    {/* <Button mode="contained" onPress={() => navigation.navigate("AllFilesHelper")}>
      All Documents
    </Button> */}

    <Button mode="contained" onPress={ ()=> Linking.openURL(driveLink) }>
      All Documents
    </Button>
    
    {/* <Button mode="contained" onPress={() => navigation.navigate("AwsScreen",{
      driveLink:driveLink,
    }
    )}>
      AWS Screen
    </Button> */}

  </Background>
)};

export default memo(IndividualSubject);
