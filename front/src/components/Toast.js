import React from "react";
import { Animated, Text, StyleSheet } from "react-native";
import styled, { useTheme } from "styled-components/native";

const ToastContainer = styled.View`
  position: absolute;
  bottom: 24px;
  left: 12px;
  right: 12px;
  background-color: ${(props) => props.theme.colors.red3};
  padding: 8px;
  border-radius: 4px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const ToastText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  text-align: center;
`;

const Toast = ({ message, visible, backgroundColor, textColor }) => {
  const [opacity] = React.useState(new Animated.Value(0));
  const theme = useTheme();

  React.useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 3000); // O Toast desaparece após 3 segundos
      });
    }
  }, [visible, opacity]);

  if (!visible) return null;

  return (
    <Animated.View style={[{ opacity }, StyleSheet.absoluteFill]}>
      <ToastContainer backgroundColor={backgroundColor || theme.colors.error}>
        <ToastText textColor={textColor || theme.colors.white}>{message}</ToastText>
      </ToastContainer>
    </Animated.View>
  );
};

export default Toast;
