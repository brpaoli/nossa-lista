import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Container } from '../components/Container'

export const LoadingScreen = () => {
    return (
      <Container justify="center">
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Carregando...</Text>
      </Container>
    )
  
}