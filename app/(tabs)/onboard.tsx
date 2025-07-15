import CustomView from "@/components/general/CustomView";
import Bluetooth from "@/components/Onboard/Section/bluetooth";
import First from "@/components/Onboard/Section/first";
import Second from "@/components/Onboard/Section/second";
import Name from "@/components/Onboard/Section/SignIn/name";
import School from "@/components/Onboard/Section/SignIn/school";
import Subject from "@/components/Onboard/Section/SignIn/subject";
import { useEffect, useState } from "react";

export default function Onboard() {
    const [thisPage, setThisPage] = useState<'first' | 'second' | 'bluetooth' | 'name' | 'school' | 'subject'>('first');
    const [isBluetoothConnected, setIsBluetoothConnected] = useState(false);
    
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
            style={{flex : 1}}
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
                        setThisPage('school');
                    }}
                />
            )}
            {thisPage === 'school' && <School/>}
            {thisPage === 'subject' && <Subject/>}
        </CustomView>
    )
}