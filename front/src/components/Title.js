import styled from 'styled-components/native';

export const Title = styled.Text`
  font-size: ${(props) => props.fontSize || '20px'};
  font-weight: ${(props) => props.fontWeight};
  margin-bottom: ${(props) => props.marginBottom || '10px'};
  text-align: ${(props) => props.textAlign || 'left'};
  color: ${(props) => props.color || 'white'};
`;