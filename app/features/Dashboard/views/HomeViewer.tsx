import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeViewer = () => {
  return (
    <View style={styles.container}>
      <Text>HomeViewer</Text>
    </View>
  )
}

export default HomeViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
})