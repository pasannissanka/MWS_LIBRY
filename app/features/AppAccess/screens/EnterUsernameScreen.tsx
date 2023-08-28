import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressBar from '../components/ProgressBar'

const EnterUsernameScreen = () => {
  return (
    <View>
        <ProgressBar completed={4} uncompleted={6} />
      <Text>EnterUsernameScreen</Text>
    </View>
  )
}

export default EnterUsernameScreen

const styles = StyleSheet.create({})