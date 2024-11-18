import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Logo from "../assets/Logo.svg";
import { Container } from '../components/Container';
const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => navigation.navigate('Login'), 2000);
    });
  }, [fadeAnim, navigation]);

  return (
    <Container justify="center">
      <Animated.View style={{ opacity: fadeAnim }}>
        <Logo style={{ width: 280, height: 77, resizeMode: 'contain' }} width={280} height={77} />
      </Animated.View>
    </Container>
  );
};

export default SplashScreen;
