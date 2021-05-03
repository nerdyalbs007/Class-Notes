import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";

const Dashboard = ({ navigation }) => (
  <Background>
    {/* <Logo /> */}
    <Header>Welcome Teacher</Header>
    {/* <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph> */}

    {/* <Button mode="contained" onPress={() => navigation.navigate("IndividualSubject")}>
      Fourth Year
    </Button> */}
    <Button mode="contained" onPress={() => navigation.navigate("IndividualYear")}>
      Fourth Year
    </Button>
    {/* <Button mode="contained">
      Third Year
    </Button>
    <Button mode="contained">
      Second Year
    </Button>
    <Button mode="contained">
      First Year
    </Button> */}


    <Button mode="outlined" onPress={() => logoutUser()}>
      Logout
    </Button>

  </Background>
);

export default memo(Dashboard);
