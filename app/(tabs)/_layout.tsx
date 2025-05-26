import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import {StatusBar} from "expo-status-bar";

export default function TabLayout() {

    return (
        <>
            <StatusBar style="light" translucent backgroundColor="transparent" />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: Platform.select({
                        ios: {
                            position: 'absolute',
                        },
                        default: {},
                    }),
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarStyle: { display: 'none' }, // Tab Bar 숨기기
                    }}
                />
                <Tabs.Screen
                    name="timePage"
                    options={{
                        title: 'Time',
                        tabBarStyle: { display: 'none' }, // Tab Bar 숨기기
                    }}
                />
                <Tabs.Screen
                    name="onboard"
                    options={{
                        title: 'onboard',
                        tabBarStyle: { display: 'none' }, // Tab Bar 숨기기
                    }}
                />
            </Tabs>
        </>

    );
}