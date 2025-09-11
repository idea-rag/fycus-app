import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useBLE from "@/feature/useBLE";
import ApiClient from "@/http/https";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import useFormStore from "@/store/useForm";
import { Alert } from "react-native";
import React, { useState } from "react";
import { Text } from "react-native";
import BluetoothCard from "../BluetoothCard";

interface IProps {
    isConnected: boolean;
    onConnect: (isConnected: boolean) => void;
    onRegisterSuccess?: () => void; // Add callback for successful registration
}

export default function BluetoothSection({ isConnected, onConnect, onRegisterSuccess }: IProps) {
    const {
        requestPermissions,
        scanForPeripherals,
        allDevices,
        connectToDevice,
        disconnectFromDevice,
        connectedDevice,
    } = useBLE();
    
    const [isScanning, setIsScanning] = useState(false);
    const [connectingId, setConnectingId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [disconnecting, setDisconnecting] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    // Initialize API client
    //@ts-ignore
    const {submitName, submitSchool, submitGrade, submitGmail, submitPassword, submitSubjectModule, submitFocusSubject, submitWhatWeek} = useFormStore();
    const apiClient = new ApiClient(process.env.EXPO_PUBLIC_API_URL);

    // Get form data from store
    const formData = {
        submitName: submitName,
        submitSchool: submitSchool,
        submitGrade: submitGrade,
        submitEmail: submitGmail,
        submitPassword: submitPassword,
        submitSubjectModule: submitSubjectModule,
        submitWhatFocus: submitFocusSubject,
        submitWhatWeek: submitWhatWeek,
    };

    const handleScanPress = async () => {
        setIsScanning(true);
        const isPermissionsEnabled = await requestPermissions();
        if (isPermissionsEnabled) {
            scanForPeripherals();
        }
    };

    const handleConnectOrDisconnect = async (deviceId: string) => {
        setErrorMsg(null);
        if (connectedDevice?.id === deviceId) {
            setDisconnecting(true);
            try {
                await disconnectFromDevice();
                onConnect(false);
            } catch (e) {
                setErrorMsg('해제 실패: ' + (e instanceof Error ? e.message : String(e)));
            } finally {
                setDisconnecting(false);
            }
        } else {
            setConnectingId(deviceId);
            try {
                await connectToDevice(deviceId);
                onConnect(true);
            } catch (e) {
                setErrorMsg('연결 실패: ' + (e instanceof Error ? e.message : String(e)));
            } finally {
                setConnectingId(null);
            }
        }
    };

    const handleTestOnPress = () => {
        onConnect(!isConnected);
    };

    return (
        <CustomView
            alignItems="center"
            justifyContent="center"
            width={'100%'}
            height={'100%'}
            style={{flex: 1}}
            gap={SPACING.small}
        >
            <CustomView
                alignItems={'center'}
                justifyContent={'flex-start'}
                flexDirection={'column'}
                gap={SPACING.small}
                width={322}
                height={400}
                borderRadius={SPACING.tiny}
                paddingHorizontal={SPACING.medium}
                paddingVertical={SPACING.medium}
                style={{borderWidth: 1, borderColor: 'rgba(54, 54, 54, 0.08)'}}
            >
                <CustomText fontSize={FONTS.size.body} fontWeight={500}>
                    {isConnected ? '블루투스 연결됨' : '블루투스 연결'}
                </CustomText>
                
                {errorMsg && <Text style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</Text>}
                
                {!isConnected && (
                    <CustomButton
                        text={isScanning ? '스캔 중...' : '기기 스캔'}
                        onPress={handleScanPress}
                        width={200}
                    />
                )}

                {/* {isScanning && allDevices.length > 0 && (
                    <CustomView width="100%" gap={SPACING.small}>
                        <CustomText>사용 가능한 기기:</CustomText>
                        {allDevices.map((device) => (
                            <BluetoothCard
                                key={device.id}
                                device={device}
                                isConnected={connectedDevice?.id === device.id}
                                isConnecting={connectingId === device.id}
                                onPress={() => handleConnectOrDisconnect(device.id)}
                            />
                        ))}
                    </CustomView>
                )} */}

                {/* {connectedDevice && (
                    <BluetoothCard
                        device={connectedDevice}
                        isConnected={true}
                        isDisconnecting={disconnecting}
                        onPress={() => handleConnectOrDisconnect(connectedDevice.id)}
                    />
                )} */}
            </CustomView>


            <CustomText fontSize={FONTS.size.body} textColor={COLORS.text.primary} style={{textAlign: 'center'}}>
                블루투스 장치를 먼저 연결하지 않아도 회원가입이 가능합니다.
            </CustomText>

            <CustomButton
                text={isConnected ? '연결 해제' : '연결 테스트'}
                textColor={COLORS.bng.primary}
                width={290}
                textWeight={700}
                fontSize={FONTS.size.small}
                backgroundColor={COLORS.brand.secondary}
                style={{ borderRadius: SPACING.tiny, paddingVertical: SPACING.small }}
                onPress={handleTestOnPress}
            />
        </CustomView>
    );
}