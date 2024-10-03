import { StatusBar, View, Fab, Center } from "native-base";
import { ScrollView, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { NextAlarm } from "./nextAlarm";
import { Link } from "expo-router";
import MedCard from './medicamentoCard';

export function AlarmHome() {
  return (
    <View flex={1}>
      <StatusBar/>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.nextAlarmContainer}>
          <NextAlarm />
      </View>
        
        <View>
          <MedCard/>
          <MedCard/>
          <MedCard/>
          <MedCard/>
          <MedCard/>
          <MedCard/>
        </View>
       
      </ScrollView>
      <Link asChild href='./RegistroMed'>
            <Fab
              renderInPortal={false}
              shadow={2}
              size="sm"
              icon={<AntDesign name="plus" size={25} color="white" />}
              backgroundColor="#29B6F6"
              position="absolute"
              bottom={10}
              right={30}
              
            />
        </Link>
      <View style={styles.footbarContainer}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    
  },
  footbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  nextAlarmContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }
});
