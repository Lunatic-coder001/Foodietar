import React, { useContext, useState } from "react";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { ActivityIndicator,Colors } from "react-native-paper";
import { AccountBackground, AccountContainer, AccountCover, Authbutton, AuthInput, ErrorContainer, Title } from "../component/account.styles";
// we grabbed the on login from the authentication context, which is what we'll use to log in the user.
export const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {onLogin,error,isLoading} = useContext(AuthenticationContext)
    return (
        <AccountBackground>
            <AccountCover />
            <Title>Foodietar</Title>
            <AccountContainer>
                <AuthInput
                    label="E-mail"
                    value={email}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(u) => setEmail(u)}
                />
                <Spacer size="large">
                    <AuthInput
                    label="Password"
                    value={password}
                    textContentType="password"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={(p) => setPassword(p)}    
                    />
                </Spacer>
                {error && (
                    <ErrorContainer size="large">
                        <Text variant="error">{error}</Text>
                    </ErrorContainer>
                )}
                    <Spacer size="large">
                    {!isLoading ? (
                        <Authbutton
                        icon="lock-open-outline"
                        mode="contained"
                        onPress={() => onLogin(email,password)}
                        >
                            Login
                        </Authbutton>
                    ) : (
                            <ActivityIndicator animating={true }  />
                    )}
                    </Spacer>
            </AccountContainer>
            <Spacer size="large">
                <Authbutton
                mode="contained"
                onPress={() => navigation.goBack()}
                >
                    Back
                </Authbutton>
            </Spacer>
        </AccountBackground>

    )
};
// So both of these fields together ensure that we get the correct output for the user in terms of the experience that they want to fill
// in an email address.
/* The error is inside of an array. So what we want to do here is actually we want to call error zero, which will get the zeroth element on
the array. And if we hit log in here, oh, well, that's that's not going to work. Well, what do we do in this case, we can't call zero on 
undefined, there's two options here. We can go inside our authentication context and we can say that by default, the error is an empty array
since we expect an array or the next thing we can do. And on top of that, maybe we'll do it in combination with something, will add an empty array here.
But the next that on the login screen will also only conditionally render the error.So we'll wrap this with error &&. Json.parse also 
doesn't work  */