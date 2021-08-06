import React from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import {background, primary} from '../config/colors';
import { Text } from 'react-native';

const InputField = ({
  keyboardType = 'default',
  multiline = false,
  onChangeText,
  value,
  placeholder = 'johndoe',
  placeholderTextColor = primary.text,
  height = 56,
  width = '80%',
  label = 'Username',
  labelWidth = 58,
  secureTextEntry = false,
  textInput = true,
}) => {
  return (
    <Container style={{height, width}}>
      <Text
        style={{
          marginLeft: 1,
          marginTop: -11,
          fontSize: 13,
          backgroundColor: background.main,
          width: labelWidth,
          color: primary.text,
        }}>
        {label}
      </Text>
      {textInput && (
        <TextInput
          style={{width: '100%', height: '100%', marginTop: -6}}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          autoCapitalize='none'
          autoCompleteType='off'
        />
      )}
    </Container>
  );
};

export default InputField;

const Container = styled.View`
  background: ${background.main};
  border: 1px solid ${primary.text};
  border-radius: 8px;
  margin-top: 22px;
  padding-left: 20px;
`;
