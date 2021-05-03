import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    {/* <Header>Class Notes</Header> */}

    {/* <Paragraph>
      This template supports Firebase authorization out of the box.
    </Paragraph> */}
    <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
      Login as Student
    </Button>

    <Button mode="contained" onPress={() => navigation.navigate("TeacherLogin")}>
      Login as Teacher
    </Button>

    <Button
      mode="outlined"
      onPress={() => navigation.navigate("RegisterScreen")}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
