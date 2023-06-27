import React from "react";
//import Lottie from "lottie-react-native"
import { Spacer } from "../../../components/spacer/spacer.component";

import { AccountBackground , AccountContainer, AccountCover, Authbutton, Title ,AnimationWrapper, StyledLottieView} from "../component/account.styles";

export const
    AccountScreen = ({ navigation }) => {
    return <AccountBackground>
              <AccountCover/>
              <StyledLottieView/>
              <Title>Foodietar</Title>
              <AccountContainer>
                <Authbutton
                icon="lock-open-outline"
                mode="contained"
                onPress={() =>navigation.navigate("Login")}
                >
                    Login
                </Authbutton>
                <Spacer size="large">
                    <Authbutton
                    icon="email"
                    mode="contained"
                    onPress={() => navigation.navigate("Register")}
                    >
                    Register
                    </Authbutton>
                </Spacer>
              </AccountContainer>
           </AccountBackground>
};