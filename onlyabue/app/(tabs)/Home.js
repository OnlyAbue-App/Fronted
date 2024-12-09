import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import { View } from 'native-base';
import { AlarmHome } from '../../components/alarmHome';
import * as Notifications from 'expo-notifications';
import initializeCollections from '../../services/initFirestore';
import { Platform } from 'react-native';

export default function Home() {
   
    return (
        <View flex={1}>
          <AlarmHome/>
        </View>     
    );
}