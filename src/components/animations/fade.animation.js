import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInView = ({ duration = 1500, ...props }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, duration]);

    return (
        <Animated.View //Special animatable View 
            style={{
                ...props.style, 
                opacity: fadeAnim,  //Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
};

/* useRef This is a react reference.So they utilize that to reference an object and keep that reference.  we'll use something called the 
animated timing to take the feed animation that was just currently of value zero and transition it to value one over ten thousand ms.
And we'll call that the feed animation and then we give that feed animation, that value that's going to go from zero to one over 10000 ms.
We'll give it to the opacity and by giving it to the opacity, what's going to happen is going to fade into view.*/