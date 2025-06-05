import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import useBLE from "@/feature/useBLE";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import React, { useState } from "react";
import {
  Text
} from "react-native";
import BluetoothCard from "../BluetoothCard";

export default function BluetoothSection() {
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
      } catch (e) {
        setErrorMsg('해제 실패: ' + (e instanceof Error ? e.message : String(e)));
      }
      setDisconnecting(false);
    } else {
      setConnectingId(deviceId);
      try {
        await connectToDevice(deviceId);
      } catch (e) {
        setErrorMsg('연결 실패: ' + (e instanceof Error ? e.message : String(e)));
      }
      setConnectingId(null);
    }
  };

  return (
    <CustomView
    alignItems={'center'}
    justifyContent={'center'}
    width={'100%'}
    height={'100%'}
    style={{flex : 1}}
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
      style={{borderWidth : 1, borderColor : 'rgba(54, 54, 54, 0.08)'}}
      >
        <CustomText
        fontSize={FONTS.size.body}
        fontWeight={500}
        >
          bluetooth
        </CustomText>
      {errorMsg && <Text style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</Text>}
      <>{isScanning && (
        allDevices.map((device) => (
          <BluetoothCard
            key={device.id}
            id={device.id}
            name={device.name ? device.name : '이름 없음'}
            isConnected={connectedDevice?.id === device.id}
            onPress={() => {
              if (connectingId || disconnecting) return;
              handleConnectOrDisconnect(device.id);
            }}
          />
        ))
      )}
      </>
      </CustomView>
      <CustomButton
      text="기기 찾기"
                  textColor={COLORS.bng.primary}
                  width={290}
                  textWeight={700}
                  fontSize={FONTS.size.small}
                  backgroundColor={COLORS.brand.primary}
                  style={{ borderRadius: SPACING.tiny, paddingVertical: SPACING.small }}
                  onPress={handleScanPress}
      />
      <CustomText
      fontSize={FONTS.size.body}
      textColor={COLORS.text.primary}
      style={{textAlign : 'center'}}
      >
      다음 중, IDEA-RAG-hardware
      라는 기기를 찾아 연결해주세요.
      </CustomText>
    </CustomView>
  );
};