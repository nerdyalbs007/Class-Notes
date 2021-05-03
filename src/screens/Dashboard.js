import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";

const Dashboard = ({ navigation }) => {
  const driveLinkTemporary="https://drive.google.com/drive/folders/1LHlHiGXalpCyPwllHyq6hD9iw1FuRM21"
  return(
  <Background>
    {/* <Logo /> */}
    <Header>Welcome Student</Header>
    {/* <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph> */}

    <Button mode="contained" onPress={() => navigation.navigate("IndividualSubject",
    {
      subjectName:'MCC',
      driveLink:driveLinkTemporary
    }
    )}>
      MCC
    </Button>

    <Button mode="contained" onPress={() => navigation.navigate("IndividualSubject",
    {
      subjectName:'DSIP',
      driveLink: driveLinkTemporary
    }
    )}>
      DSIP
    </Button>

    <Button mode="contained" onPress={() => navigation.navigate("IndividualSubject",
    {
      subjectName:'NLP',
      driveLink: driveLinkTemporary
    }
    )}>
      NLP
    </Button>

    <Button mode="contained" onPress={() => navigation.navigate("IndividualSubject",
    {
      subjectName:'AI',
      driveLink: driveLinkTemporary
    }
    )}>
      AI
    </Button>
    


    <Button mode="outlined" onPress={() => logoutUser()}>
      Logout
    </Button>

  </Background>
)};

export default memo(Dashboard);
