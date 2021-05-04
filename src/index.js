import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  AuthLoadingScreen,
  Dashboard,
  IndividualSubject,
  TeacherLogin,
  TeacherDashboard,
  IndividualYear,
  AllFiles,
  AllFiles1,
  AllFilesHelper,
  AllFilesImg,
  TeacherUpload,
  AwsScreen,
  VideoCall,
  VideoCallRegister,
  VideoCallStart,
  VideoCallTest,
} from "./screens";

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    IndividualSubject,
    AuthLoadingScreen,
    TeacherLogin,
    TeacherDashboard,
    IndividualYear,
    AllFiles,
    AllFiles1,
    AllFilesImg,
    AllFilesHelper,
    TeacherUpload,
    AwsScreen,
    VideoCall,
    VideoCallRegister,
    VideoCallStart,
    VideoCallTest,
  },
  {
    initialRouteName: "AuthLoadingScreen",
    headerMode: "none"
  }
);

export default createAppContainer(Router);
