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
    <Button mode="contained" >
      Go To Live Lecture
    </Button>
    {/* <Button mode="contained" onPress={() => navigation.navigate("AllFilesHelper")}>
      All Documents
    </Button> */}

    <Button mode="contained" onPress={ ()=> Linking.openURL(driveLink) }>
      All Documents
    </Button>
    
    <Button mode="contained" onPress={() => navigation.navigate("AwsScreen",{
      driveLink:driveLink,
    }
    )}>
      AWS Screen
    </Button>

  </Background>
)};

export default memo(IndividualSubject);
