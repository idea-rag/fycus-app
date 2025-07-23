import CustomView from "@/components/general/CustomView";
import Bluetooth from "@/components/Onboard/Section/bluetooth";
import First from "@/components/Onboard/Section/first";
import Second from "@/components/Onboard/Section/second";
import Gmail from "@/components/Onboard/Section/SignIn/gmail";
import Loading from "@/components/Onboard/Section/SignIn/loading";
import Name from "@/components/Onboard/Section/SignIn/name";
import Password from "@/components/Onboard/Section/SignIn/password";
import School from "@/components/Onboard/Section/SignIn/school";
import Subject from "@/components/Onboard/Section/SignIn/subject";
import WhatFocus from "@/components/Onboard/Section/SignIn/whatFocus";
import WhatWeek from "@/components/Onboard/Section/SignIn/whatWeek";
import Work from "@/components/Onboard/Section/SignIn/work";
import useFormStore from "@/store/useForm";
import { COLORS } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Onboard() {
    const router = useRouter();
    const [thisPage, setThisPage] = useState<'first' | 'second' | 'bluetooth' | 'name' | 'gmail' | 'password' | 'school' | 'subject' | 'work' | 'whatFocus' | 'whatWeek' | 'loading'>('first');
    const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
    //@ts-ignore
    const {submitSubjectModule} = useFormStore();
    
    useEffect(() => {
        const timer1 = setTimeout(() => {
            setThisPage('second');
            const timer2 = setTimeout(() => {
                setThisPage('bluetooth');   
            }, 2000);
            return () => clearTimeout(timer2);
        }, 2000);
        return () => {
            clearTimeout(timer1);
        };
    }, []);

    return (
        <CustomView
            alignItems={'center'}
            justifyContent={'center'}
            style={{flex : 1, backgroundColor : COLORS.bng.primary}}
            width={'100%'}
            height={'100%'}
        >
            {thisPage === 'first' && <First/>}
            {thisPage === 'second' && <Second/>}
            {thisPage === 'bluetooth' && (
                <Bluetooth
                    isConnected={isBluetoothConnected}
                    onConnect={(isConnected) => {
                        setIsBluetoothConnected(isConnected);
                        if (isConnected) {
                            setThisPage('name');
                        }
                    }}
                />
            )}
            {thisPage === 'name' && (
                <Name
                    onNext={() => {
                        setThisPage('gmail');
                    }}
                />
            )}
            {thisPage === 'gmail' && <Gmail
                onNext={() => {
                    setThisPage('password');
                }}
            />}
            {thisPage === 'password' && <Password
                onNext={() => {
                    setThisPage('school');
                }}
            />}
            {thisPage === 'school' && <School
                onNext={() => {
                    setThisPage('subject');
                }}
            />}
            {thisPage === 'subject' && <Subject
                onNext={() => {
                    setThisPage('work');
                    console.log(submitSubjectModule);
                }}
            />}
            {thisPage === 'work' && <Work
                onNext={() => {
                    setThisPage('whatFocus');
                }}
            />}     
            {thisPage === 'whatFocus' && <WhatFocus
                onNext={() => {
                    setThisPage('whatWeek');
                }}
            />}     
            {thisPage === 'whatWeek' && <WhatWeek
                onNext={() => {
                    setThisPage('loading');
                }}
            />}
            {thisPage === 'loading' && <Loading
                onNext={() => {
                    router.push('/');
                }}
            />}
        </CustomView>
    )
}