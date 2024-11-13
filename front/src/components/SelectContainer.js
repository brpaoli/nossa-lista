import React from 'react';
import styled from 'styled-components/native';
import RNPickerSelect from 'react-native-picker-select';

const SelectContainer = styled.View`
  width: 100%;
  border: 1px solid #fafafa;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
  background-color: #d2bef5;
`;

const StyledPicker = styled(RNPickerSelect).attrs(({ theme }) => ({
  placeholder: {
    label: 'Selecione uma opção...',
    value: null,
    color: '#fafafa',
  },
  style: {
    inputIOS: {
      color: '#fafafa',
      paddingHorizontal: 10,
      fontSize: 16,
      height: 40,
    },
    inputAndroid: {
      color: '#fafafa',
      paddingHorizontal: 10,
      fontSize: 16,
      height: 40,
    },
    placeholder: {
      color: '#eaeaea',
    },
  },
}))``;

const SelectField = ({ items, onValueChange, value }) => {
  return (
    <SelectContainer>
      <StyledPickerr
        items={items}
        onValueChange={onValueChange}
        value={value}
        placeholder={{ label: 'Selecione uma opção...', value: null }}
      />
    </SelectContainer>
  );
};

export default SelectField;