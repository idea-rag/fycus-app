import { Tabs } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { Platform } from 'react-native';

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
                <Tabs.Screen
                    name="AIPage"
                    options={{
                        title: 'AI',
                        tabBarStyle: { display: 'none' }, // Tab Bar 숨기기
                    }}
                />
                <Tabs.Screen
                    name="ProfilePage"
                    options={{
                        title: 'Profile',
                        tabBarStyle: { display: 'none' }, // Tab Bar 숨기기
                    }}
                />
                <Tabs.Screen
                    name="calendarPage"
                    options={{
                        title: 'calendarPage',
                        tabBarStyle: { display: 'none' }, // Tab Bar 숨기기
                    }}
                />
            </Tabs>
        </>

    );
}