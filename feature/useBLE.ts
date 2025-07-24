import { Buffer } from 'buffer';
import * as ExpoDevice from 'expo-device';
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// 로깅 유틸리티 함수
const logger = {
  log: (level: LogLevel, message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (data) {
      console[level === 'debug' ? 'debug' : level](logMessage, data);
    } else {
      console[level === 'debug' ? 'debug' : level](logMessage);
    }
    
    // 여기에 로그를 파일로 저장하는 로직을 추가할 수 있습니다.
  },
  debug: (message: string, data?: any) => logger.log('debug', message, data),
  info: (message: string, data?: any) => logger.log('info', message, data),
  warn: (message: string, data?: any) => logger.log('warn', message, data),
  error: (message: string, error?: Error) => {
    const errorInfo = error ? {
      message: error.message,
      stack: error.stack,
      ...(error as any).response?.data && { response: (error as any).response.data }
    } : undefined;
    logger.log('error', message, errorInfo);
  }
};


/* eslint-disable no-bitwise */
interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevices: Device[];
    connectToDevice(deviceId: string): Promise<Device>;
    disconnectFromDevice(): Promise<void>;
    connectedDevice: Device | null;
    startListeningToCharacteristic(serviceUUID: string, characteristicUUID: string, device?: Device): Promise<void>;
    stopListeningToCharacteristic(serviceUUID: string, characteristicUUID: string): Promise<void>;
    receivedData: string;
    error: Error | null;
    isScanning: boolean;
}

function useBLE(): BluetoothLowEnergyApi {
  const ble = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [receivedData, setReceivedData] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const requestAndroid31Permissions = async () => {
    logger.debug("Requesting Android 31+ permissions");
      const bluetoothScanPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          {
              title: "Bluetooth Scan Permission",
              message: "This app needs access to your Bluetooth to scan for devices.",
              buttonPositive: "OK",
          },
      );
      const bluetoothConnectPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
              title: "Bluetooth Connect Permission",
              message: "This app needs access to your Bluetooth to connect to devices.",
              buttonPositive: "OK",
          },
      );
      const bluetoothFindLocationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
              title: "Bluetooth Find Location Permission",
              message: "App requires find location",
              buttonPositive: "OK",
          },
      );
      return (
          bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
          bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
          bluetoothFindLocationPermission === PermissionsAndroid.RESULTS.GRANTED
      )
  }

  const requestPermissions = async (): Promise<boolean> => {
    try {
      logger.debug("Requesting BLE permissions");
      
      if (Platform.OS === 'android') {
        if ((ExpoDevice.platformApiLevel ?? 0) >= 31) {
          logger.debug("Android 12+ detected, requesting BLUETOOTH_SCAN and BLUETOOTH_CONNECT");
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
              title: 'Bluetooth 권한 필요',
              message: '블루투스 장치를 스캔하기 위해 권한이 필요합니다.',
              buttonPositive: '확인',
            }
          );

          const bluetoothConnectGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
              title: 'Bluetooth 연결 권한 필요',
              message: '블루투스 장치에 연결하기 위해 권한이 필요합니다.',
              buttonPositive: '확인',
            }
          );

          const locationGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: '위치 권한 필요',
              message: '주변 블루투스 장치를 검색하기 위해 위치 권한이 필요합니다.',
              buttonPositive: '확인',
            }
          );

          return (
            bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED &&
            bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED &&
            locationGranted === PermissionsAndroid.RESULTS.GRANTED
          );
        } else {
          // Android 12 미만인 경우
          logger.debug("Android 11 or below, requesting location permission");
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: '위치 권한 필요',
              message: '블루투스 장치를 검색하기 위해 위치 권한이 필요합니다.',
              buttonPositive: '확인',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } else if (Platform.OS === 'ios') {
        const bleState = await ble.state();
        return bleState === 'PoweredOn' || bleState === 'Resetting';
      }
      
      return false;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      logger.error('권한 요청 중 오류 발생', error);
      return false;
    }
  }

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.some((device) => nextDevice.id === device.id);

  const connectToDevice = async (deviceId: string) => {
    try {
      setError(null);
      
      // 권한 확인
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        throw new Error('Bluetooth 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.');
      }

      // Bluetooth 상태 확인
      const bleState = await ble.state();
      if (bleState !== 'PoweredOn') {
        throw new Error('Bluetooth가 꺼져있습니다. Bluetooth를 켜주세요.');
      }

      // 기존 연결 해제
      if (connectedDevice) {
        try {
          await ble.cancelDeviceConnection(connectedDevice.id);
        } catch (e) {
          logger.warn('기존 연결 해제 중 오류', e);
        }
      }

      // 새로 연결 시도
      logger.info(`Connecting to device: ${deviceId}`);
      const device = await ble.connectToDevice(deviceId, {
        requestMTU: 512, // 최대 전송 단위 설정
        autoConnect: false, // 자동 재연결 비활성화
        timeout: 10000, // 10초 타임아웃
      });
      
      logger.info('Connected, discovering services...');
      await device.discoverAllServicesAndCharacteristics();
      
      // 연결 상태 모니터링
      device.onDisconnected((error, device) => {
        if (error) {
          logger.error('Device disconnected with error:', error);
          setError(new Error(`기기 연결이 끊어졌습니다: ${error.message}`));
        } else {
          logger.info('Device disconnected');
        }
        setConnectedDevice(null);
      });

      setConnectedDevice(device);
      logger.info('Successfully connected to device');
      return device;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      logger.error('BLE 연결 실패', error);
      setError(error);
      setConnectedDevice(null);
      throw error;
    }
  };

  const disconnectFromDevice = async (): Promise<void> => {
    if (!connectedDevice) {
      logger.debug('No connected device to disconnect');
      return;
    }

    // Save the device ID before clearing the state
    const deviceId = connectedDevice.id;
    
    try {
      setError(null);
      logger.info(`Disconnecting from device: ${deviceId}`);
      
      // 연결 해제 시도
      await ble.cancelDeviceConnection(deviceId);
      logger.info('Successfully disconnected from device');
    } catch (err) {
      // 이미 연결이 끊긴 경우는 무시
      const errorMsg = err instanceof Error ? err.message : String(err);
      if (errorMsg.includes('not connected')) {
        logger.info(`Device ${deviceId} was already disconnected`);
        return;
      }
      
      const error = err instanceof Error ? err : new Error(String(err));
      logger.error('BLE 연결 해제 실패', error);
      setError(error);
      throw error;
    } finally {
      // Always update the state
      if (connectedDevice && connectedDevice.id === deviceId) {
        setConnectedDevice(null);
      }
    }
  };

  const scanForPeripherals = async () => {
    try {
      // 권한 확인 및 요청
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        throw new Error('Bluetooth 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.');
      }

      // Bluetooth 상태 확인
      const bleState = await ble.state();
      if (bleState !== 'PoweredOn') {
        throw new Error('Bluetooth가 꺼져있습니다. Bluetooth를 켜주세요.');
      }

      ble.stopDeviceScan();
      setAllDevices([]);
      setIsScanning(true);
      
      ble.startDeviceScan(null, null, (error, device) => {
        if (error) {
          logger.error('BLE 스캔 중 오류 발생', error);
          ble.stopDeviceScan();
          setIsScanning(false);
          setError(error);
          return;
        }
        if (device && device.name) {
          setAllDevices((prevState: Device[]) => {
            if (!isDuplicateDevice(prevState, device)) {
              return [...prevState, device];
            }
            return prevState;
          });
        }
      });
      
      // 10초 후 스캔 자동 중지
      setTimeout(() => {
        ble.stopDeviceScan();
        setIsScanning(false);
      }, 10000);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      logger.error('기기 스캔 실패', error);
      setError(error);
      setIsScanning(false);
    }
  };

  const startListeningToCharacteristic = async (serviceUUID: string, characteristicUUID: string, device?: Device) => {
    const targetDevice = device || connectedDevice;
    if (!targetDevice) {
      const error = new Error('No device connected');
      logger.error('특성 모니터링 실패', error);
      throw error;
    }
    
    logger.info(`특성 모니터링 시작 - Service: ${serviceUUID}, Characteristic: ${characteristicUUID}`);
    
    try {
      // 1. 알림(Notification) 활성화
      logger.info('알림 활성화 시도 중...');
      
      // iOS/Android 모두에서 작동하는 방식으로 알림 활성화
      await targetDevice.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        Buffer.from([0x01, 0x00]).toString('base64') // Enable notification
      );
      
      logger.info('알림 활성화 성공');

      // 2. 모니터링 시작
      const subscription = targetDevice.monitorCharacteristicForService(
        serviceUUID,
        characteristicUUID,
        (error, characteristic) => {
          if (error) {
            logger.error('특성 모니터링 중 오류 발생', error);
            setError(error);
            return;
          }
          
          if (characteristic?.value) {
            try {
              // Base64로 인코딩된 데이터를 디코딩
              const rawData = characteristic.value;
              const buffer = Buffer.from(rawData, 'base64');
              
              // 데이터 포맷에 따라 파싱 (예: Uint8Array로 변환)
              const dataArray = new Uint8Array(buffer);
              
              // 16진수 문자열로 변환 (디버깅용)
              const hexString = Array.from(dataArray)
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' ');
              
              // 텍스트로도 변환 시도 (가능한 경우)
              const textString = buffer.toString('utf8');
              
              logger.info('BLE 데이터 수신', { 
                rawData,
                hexString,
                textString,
                timestamp: new Date().toISOString(),
                serviceUUID,
                characteristicUUID,
                isNotifiable: characteristic.isNotifiable,
                isNotifying: characteristic.isNotifying,
              });
              
              // 상태 업데이트 - 텍스트 문자열 전달
              setReceivedData(textString);
            } catch (parseError) {
              const error = parseError instanceof Error ? parseError : new Error(String(parseError));
              logger.error('데이터 파싱 중 오류 발생', error);
            }
          }
        },
        'monitor-' + characteristicUUID // 트랜잭션 ID
      );
      
      logger.info('모니터링 시작됨', { subscription });
      
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      logger.error('특성 모니터링 설정 중 오류 발생', error);
      setError(error);
      throw error;
    }
  };

  const stopListeningToCharacteristic = async (serviceUUID: string, characteristicUUID: string) => {
    if (!connectedDevice) {
      logger.warn('No device connected to stop monitoring');
      return;
    }
    
    try {
      logger.info(`특성 모니터링 중지 - Service: ${serviceUUID}, Characteristic: ${characteristicUUID}`);
      
      // 1. 알림 비활성화
      try {
        await connectedDevice.writeDescriptorForService(
          serviceUUID,
          characteristicUUID,
          '00002902-0000-1000-8000-00805f9b34fb',
          Buffer.from([0x00, 0x00]).toString('base64') // Disable notification
        );
        logger.info('알림 비활성화 성공');
      } catch (err) {
        logger.warn('알림 비활성화 실패', err);
      }
      
      // 2. 모니터링 중지 (트랜잭션 ID를 사용하여 취소)
      // 참고: react-native-ble-plx에서는 cancelTransaction 대신 monitorCharacteristicForService에서 반환된 구독을 사용하여 취소
      // 이 함수에서는 단순히 알림을 비활성화하는 것으로 충분
      logger.info('모니터링이 중지되었습니다.');
      
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      logger.error('모니터링 중지 중 오류 발생', err);
      throw err;
    }
  };

  return {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice,
    startListeningToCharacteristic,
    stopListeningToCharacteristic,
    receivedData,
    error,
    isScanning,
  } as const;
}


/**
 * The default export of this module is the `useBLE` hook.
 * It returns an object with the following properties:
 *
 * - `requestPermissions`: a function that requests permissions to access the device's Bluetooth Low Energy (BLE) capabilities.
 * - `scanForPeripherals`: a function that starts scanning for nearby BLE devices.
 * - `allDevices`: an array of all BLE devices discovered during the scan.
 * - `connectToDevice`: a function that connects to a specific BLE device.
 * - `disconnectFromDevice`: a function that disconnects from the connected BLE device.
 * - `connectedDevice`: the currently connected BLE device, or `null` if no device is connected.
 * - `startListeningToCharacteristic`: a function that starts listening to a specific characteristic of the connected BLE device.
 * - `stopListeningToCharacteristic`: a function that stops listening to a specific characteristic of the connected BLE device.
 * - `receivedData`: the data received from the BLE device, or `null` if no data has been received.
 */
export default useBLE;