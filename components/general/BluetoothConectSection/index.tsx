import CustomButton from "@/components/general/CustomButton";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import BluetoothCard from "@/components/Onboard/BluetoothCard";
import useBLE from "@/feature/useBLE";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { Service } from "react-native-ble-plx";


const COMMON_UART_SERVICE_UUIDS = [
    "0000ffe0-0000-1000-8000-00805f9b34fb", 
    "6e400001-b5a3-f393-e0a9-e50e24dcca9e", 
  ];

export default function BluetoothConectSection() {

    const { requestPermissions, scanForPeripherals, connectToDevice, disconnectFromDevice, connectedDevice, startListeningToCharacteristic, allDevices } = useBLE();
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
  
    
    const findAndStartListener = async () => {
      if (!connectedDevice) return;
  
      try {
        const services = await connectedDevice.services();
        let uartService: Service | undefined;
  
        
        for (const service of services) {
          if (COMMON_UART_SERVICE_UUIDS.includes(service.uuid.toLowerCase())) {
            uartService = service;
            break;
          }
        }
  
        if (!uartService) {
          throw new Error("호환되는 UART 서비스를 찾을 수 없습니다.");
        }
  
        const characteristics = await uartService.characteristics();
        const notifyCharacteristic = characteristics.find(c => c.isNotifiable);
  
        if (!notifyCharacteristic) {
          throw new Error("알림(Notify)이 가능한 특성을 찾을 수 없습니다.");
        }
        
        console.log(`Listening to Service: ${uartService.uuid}, Characteristic: ${notifyCharacteristic.uuid}`);
  
        
        await startListeningToCharacteristic(uartService.uuid, notifyCharacteristic.uuid);
  
      } catch (e) {
        setErrorMsg('리스너 시작 실패: ' + (e instanceof Error ? e.message : String(e)));
      }
    };
  
  
    useEffect(() => {
      if (connectedDevice) {
        findAndStartListener();
      }
    }, [connectedDevice]);

    return (
        <>
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
        </>

    )

}