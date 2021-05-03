import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";

const IndividualSubject = ({ navigation }) => (
  <Background>
    {/* <Logo /> */}
    <Header>Welcome Teacher</Header>
    {/* <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph> */}

    <Button mode="contained" onPress={() => navigation.navigate("VideoCall")}>
      Start Live Lecture
    </Button>
    <Button mode="contained" onPress={() => navigation.navigate("TeacherUpload")}>
      Upload Documents
    </Button>
    

  </Background>
);

export default memo(IndividualSubject);
