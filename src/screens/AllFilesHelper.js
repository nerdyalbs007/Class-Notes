import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const AllFilesHelper = ({ navigation }) => (
  <Background>
   
    {/* <Button mode="contained" onPress={() => navigation.navigate("AllFiles",{
        paramKey:'param from old screen',   
    })}>
      View PDF 1
    </Button> */}

    <Button mode="contained" onPress={() => navigation.navigate("AllFiles")}>
      View Research Paper
    </Button>

    <Button mode="contained" onPress={() => navigation.navigate("AllFiles1")}>
      View Birth Certificate
    </Button>

    <Button mode="contained" onPress={() => navigation.navigate("AllFilesImg")}>
      View Image
    </Button>

  </Background>
);

export default memo(AllFilesHelper);
