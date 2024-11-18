import styled from 'styled-components/native';
import {FlatList, TouchableOpacity} from 'react-native';

export const FlatListItens = styled.FlatList`

    text-align: left;
    margin-top: 4px;
    margin-bottom: 4px;
    width: 100%;
    max-width: 280px;
`;

export const FlatListContainer = styled.View`
  max-width: 280px;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 10; 
  max-height: ${(props) => props.maxHeight || 200}px;
  background-color: ${(props) => props.theme.gray3};
  overflow: hidden;
`;

export const ListItemContainer = styled.TouchableOpacity`
 display: flex;
 flex-direction: row;
 gap: 16px;
 margin-bottom: 16px;
`;

export const ListItemName = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.white};
`;

export const ListItemPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.dark1};
`;

export const ListItemSeparator = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.colors.separator || '#ddd'};
  margin: 8px 0;
`;