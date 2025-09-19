import ChartSection from "@/components/FocusPage/ChartSection";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { attToText } from "@/feature/attToText";
import { ParseData, parseRawData } from "@/feature/parseRawData";
import useBLE from "@/feature/useBLE";
import useStudyTimeStore from "@/store/useStudyTime";
import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { ChartDataPoint } from "@/types/chart";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBeforeStore } from "@/store/useBeforeStore";



type DeviceListProps = {
  visible: boolean;
  devices: any[];
  onSelect: (device: any) => void;
  onClose: () => void;
  isScanning: boolean;
};

const DeviceListModal = ({ visible, devices, onSelect, onClose, isScanning }: DeviceListProps) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <CustomText style={styles.modalTitle}>기기 선택</CustomText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        {isScanning ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#1976d2" />
            <CustomText style={styles.scanningText}>기기 검색 중...</CustomText>
          </View>
        ) : devices.length === 0 ? (
          <View style={styles.centered}>
            <CustomText>검색된 기기가 없습니다.</CustomText>
          </View>
        ) : (
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.deviceItem}
                onPress={() => onSelect(item)}
              >
                <MaterialIcons name="bluetooth" size={24} color="#1976d2" />
                <View style={styles.deviceInfo}>
                  <CustomText style={styles.deviceName}>{item.name || '이름 없음'}</CustomText>
                  <CustomText style={styles.deviceId}>{item.id}</CustomText>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#666" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  </Modal>
);

export default function FocusPage() {
  const { 
    requestPermissions, 
    scanForPeripherals, 
    allDevices, 
    connectToDevice, 
    connectedDevice,
    disconnectFromDevice,
    startListeningToCharacteristic,
    isScanning,
    stopListeningToCharacteristic,
    receivedData
  } = useBLE();

  
  
  const [rawData, setRawData] = useState<string>('');
  const [showDeviceList, setShowDeviceList] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true); 
  const [parsedData, setParsedData] = useState<ParseData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [timeCounter, setTimeCounter] = useState(0.5);
  const navigation = useNavigation();
  //@ts-ignore
  const {focusTime, focusTimeSetter, studyTime, studyTimeSetter} = useStudyTimeStore();
  const [lastIncrementTime, setLastIncrementTime] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  
  useEffect(() => {
    if (connectedDevice) {
      console.log('Already connected to device:', connectedDevice.name);
      setIsConnecting(false);
    } else {
      
      setIsConnecting(false);
    }
  }, [connectedDevice]);

  
  const MAX_POINTS = 15; 
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const [dataPoints, setDataPoints] = useState<number>(0);

  useEffect(() => {
    if (parsedData && parsedData.Att >= 0) {
      const now = Date.now();
      
      
      if (now - lastUpdateTime < 100) return;
      
      setChartData(prevData => {
        const newDataPoint = {
          time: dataPoints % MAX_POINTS,
          focusTime: parsedData.Att,
          ...parsedData,
          timestamp: now
        };

        const updated = [...prevData, newDataPoint].slice(-MAX_POINTS);
        
        return updated.map((item, index) => ({
          ...item,
          time: index
        }));
      });
      
      setDataPoints(prev => (prev + 1) % MAX_POINTS);
      setLastUpdateTime(now);
    }
  }, [parsedData?.Att]); 


  
  useEffect(() => {
    if (rawData && rawData.includes('-')) {  
      try {
        console.log('Raw data before parsing:', rawData);
        const parsed = parseRawData(rawData);
        console.log('Successfully parsed data:', parsed);
        setParsedData(parsed);
      } catch (err) {
        const error = err as Error;
        console.error('Error parsing data:', error);
        setParsedData({
          Att: -1,
          Med: -1,
          Var: -1,
          rawHex: rawData
        });
      }
    } else {
      setParsedData(null);
    }
  }, [rawData]);

  
  useEffect(() => {
    if (parsedData?.Att !== undefined) {
      setIsFocused(parsedData.Att >= 3);
    }
  }, [parsedData]);

  
  useEffect(() => {
    let studyInterval: ReturnType<typeof setInterval> | null = null;
    let focusInterval: ReturnType<typeof setInterval> | null = null;

    if (connectedDevice) {
      
      studyInterval = setInterval(() => {
        studyTimeSetter((prev: number) => prev + 1);
      }, 1000); 

      
      if (isFocused) {
        focusInterval = setInterval(() => {
          focusTimeSetter((prev: number) => prev + 1);
        }, 1000);
      }
    }

    
    return () => {
      if (studyInterval) clearInterval(studyInterval);
      if (focusInterval) clearInterval(focusInterval);
    };
  }, [connectedDevice, isFocused, studyTimeSetter, focusTimeSetter]);

  
  useFocusEffect(
    useCallback(() => {
      return () => {
        
        if (connectedDevice) {
          disconnectFromDevice();
        }
        
        clearIntervals();
      };
    }, [connectedDevice])
  );

  const clearIntervals = () => {
    
    const maxIntervalId = setInterval(() => {}, 0);
    for (let i = 0; i < maxIntervalId; i++) {
      clearInterval(i);
    }
  };

  useEffect(() => {
    if (!receivedData) {
      if (connectedDevice) {
        setRawData('데이터 수신 대기 중...');
      } else {
        setRawData('기기가 연결되지 않았습니다.');
      }
      setParsedData(null);
      return;
    }

    
    setRawData(receivedData);
    
    try {
      
      const parsed = parseRawData(receivedData);
      setParsedData(parsed);
      console.log('파싱된 데이터:', parsed);
    } catch (err) {
      console.error('데이터 파싱 오류:', err);
    }
  }, [receivedData, connectedDevice]);

  const formatTime = (date: Date | null) => {
    if (!date) return '아직 업데이트되지 않음';
    return date.toLocaleTimeString('ko-KR');
  };

  const handleConnectPress = async () => {
    if (connectedDevice) {
      try {
        await disconnectFromDevice();
      } catch (err) {
        console.error('연결 해제 중 오류:', err);
      }
    } else {
      setShowDeviceList(true);
      scanForPeripherals();
    }
  };

  const toggleDeviceList = async () => {
    if (isScanning) return;
    if (connectedDevice) {
      
      try {
        await disconnectFromDevice();
        setRawData('기기 연결이 해제되었습니다.');
        setChartData([]); 
        setTimeCounter(0.5); 
      } catch (err) {
        const error = err as Error;
        console.error('연결 해제 중 오류 발생:', error);
        setRawData(`연결 해제 중 오류가 발생했습니다: ${error.message}`);
      }
    } else {
      
      setShowDeviceList(prev => !prev);
    }
  };

  
  const BLE_SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
  const BLE_CHARACTERISTIC_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';

  const handleDeviceSelect = async (device: any) => {
    if (!device?.id) {
      console.error('유효하지 않은 기기입니다.');
      setRawData('오류: 유효하지 않은 기기입니다.');
      setIsConnecting(false);
      return;
    }

    try {
      setIsConnecting(true);
      setShowDeviceList(false);
      
      console.log(`기기 연결 시도: ${device.name} (${device.id})`);
      setRawData(`기기 연결 중: ${device.name || '알 수 없는 기기'}...`);
      
      
      console.log('연결 함수 호출 전');
      const connectionResult = await connectToDevice(device.id);
      
      if (!connectionResult) {
        throw new Error('연결에 실패했습니다. 반환된 연결 결과가 없습니다.');
      }
      
      console.log('기기 연결 성공:', connectionResult);
      setRawData('기기 연결됨. 서비스 검색 중...');
      
      
      try {
        console.log('사용 가능한 서비스 조회 중...');
        const services = await connectionResult.services();
        console.log('사용 가능한 서비스:', services);
        
        for (const service of services) {
          console.log(`서비스 UUID: ${service.uuid}`);
          const characteristics = await service.characteristics();
          console.log(`서비스 ${service.uuid}의 특성들:`, characteristics.map(c => c.uuid));
        }
        
        setRawData(`서비스 검색 완료. ${services.length}개 서비스 발견`);
      } catch (err) {
        console.error('서비스 검색 중 오류:', err);
        setRawData('서비스 검색 중 오류 발생. 로그 확인 바람.');
        throw err;
      }
      
      
      
      setTimeout(async () => {
        try {
          console.log(`모니터링 시작 - Service: ${BLE_SERVICE_UUID}, Characteristic: ${BLE_CHARACTERISTIC_UUID}`);
          
          if (!connectionResult) {
            throw new Error('연결 결과를 찾을 수 없습니다.');
          }
          
          console.log('연결된 기기 정보:', connectionResult);
          setRawData('특성 모니터링 시작 중...');
          
          
          await startListeningToCharacteristic(BLE_SERVICE_UUID, BLE_CHARACTERISTIC_UUID, connectionResult);
          console.log('BLE 특성 모니터링 시작됨');
          setRawData('모니터링 시작됨. 데이터 수신 대기 중...');
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
        
          setRawData(`모니터링 오류: ${error.message}`);
          
          
          try {
            await disconnectFromDevice();
            console.log('오류 후 기기 연결 해제됨');
          } catch (disconnectErr) {
            console.error('연결 해제 중 오류:', disconnectErr);
          }
        }
      }, 1000);
      
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error('기기 연결 중 오류:', error);
      setRawData(`연결 오류: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };
  //@ts-ignore
  const {setPreviousPath} = useBeforeStore();

  return (
    <SafeAreaView style={styles.container}>
        <CustomView>
        <TouchableOpacity onPress={async () => {
    await setPreviousPath('/FocusPage');  // 먼저 경로 저장
    navigation.goBack();  // 그 다음에 네비게이션
}}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
        </CustomView>
        <CustomView
            flexDirection={'column'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
        >
            {isConnecting ? (
                <CustomText fontSize={30} fontWeight={600}>
                    연결 중...
                </CustomText>
            ) : (
                <>
                    <CustomText fontSize={30} fontWeight={600}>
                        현재 한석님의 상태는 
                    </CustomText>
                    <CustomText fontSize={30} fontWeight={600}>
                        { 
                        parsedData?.Att !== undefined ? 
                        attToText(parsedData?.Att) : '연결 중...'} 상태입니다. 
                    </CustomText>
                </>
            )}
        </CustomView>
        <CustomView
            width={'100%'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <CustomText fontSize={24} fontWeight={600}>
                집중 시간: {String(Math.floor(focusTime / 3600)).padStart(2, '0')}:{String(Math.floor((focusTime % 3600) / 60)).padStart(2, '0')}:{String(focusTime % 60).padStart(2, '0')}
            </CustomText>
            <CustomText fontSize={24} fontWeight={600}>
                총 공부 시간: {String(Math.floor(studyTime / 3600)).padStart(2, '0')}:{String(Math.floor((studyTime % 3600) / 60)).padStart(2, '0')}:{String(studyTime % 60).padStart(2, '0')}
            </CustomText>
        </CustomView>
        <TouchableOpacity 
          style={[
            styles.connectButton,
            connectedDevice ? styles.connectedButton : styles.disconnectedButton
          ]}
          onPress={handleConnectPress}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <CustomText style={styles.connectButtonText}>
              {connectedDevice ? '연결 해제' : '기기 연결'}
            </CustomText>
          )}
        </TouchableOpacity>

      <ChartSection data={chartData} />
      
      <DeviceListModal
        visible={showDeviceList}
        devices={allDevices}
        onSelect={handleDeviceSelect}
        onClose={() => setShowDeviceList(false)}
        isScanning={isScanning}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: SPACING.medium,
  },
  rawDataText: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#333',
    textAlign: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  connectButton: {
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  connectedButton: {
    backgroundColor: COLORS.state.uncorrect,  
  },
  disconnectedButton: {
    backgroundColor: COLORS.state.correct,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.medium,
  },
  dataBox: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'flex-start',
    minHeight: 200,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  parsedContainer: {
    marginTop: 15,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  parsedItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  hexRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 6,
    borderRadius: 4,
  },
  hexLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
    fontWeight: '500',
  },
  hexValue: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#333',
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 3,
  },
  dataLabel: {
    width: 140,
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  dataValue: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 40,
    textAlign: 'right',
  },
  attValue: {
    color: '#1976d2', 
  },
  medValue: {
    color: '#4caf50', 
  },
  varValue: {
    color: '#f44336', 
  },
  errorBox: {
    width: '100%',
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
    fontWeight: '500',
  },
  statusBox: {
    width: '100%',
    marginTop: SPACING.small,
    padding: SPACING.medium,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusConnected: {
    backgroundColor: '#4caf50',
  },
  statusDisconnected: {
    backgroundColor: '#f44336',
  },
  statusText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 16,
  },
  deviceNameText: {
    color: '#666',
    marginBottom: 4,
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SPACING.medium,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deviceInfo: {
    flex: 1,
    marginLeft: SPACING.medium,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deviceId: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.medium,
  },
  scanningText: {
    marginTop: SPACING.medium,
    color: '#666',
  },
});