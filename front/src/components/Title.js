import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: ${(props) => props.fontSize || '20px'};
  font-weight: ${(props) => props.fontWeight};
  margin-bottom: ${(props) => props.marginBottom || '12px'};
  margin-top: ${(props) => props.marginTop || '12px'};
  text-align: center;
  color: ${(props) => props.color || 'white'};
`;