import { Buffer } from 'buffer';
import * as ExpoDevice from 'expo-device';
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

type LogLevel = 'debug' | 'info' | 'warn' | 'error';


const logger = {
  log: (level: LogLevel, message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (data) {
      console[level === 'debug' ? 'debug' : level](logMessage, data);
    } else {
      console[level === 'debug' ? 'debug' : level](logMessage);
    }
    
    
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
      
      
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        throw new Error('Bluetooth 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.');
      }

      
      const bleState = await ble.state();
      if (bleState !== 'PoweredOn') {
        throw new Error('Bluetooth가 꺼져있습니다. Bluetooth를 켜주세요.');
      }

      
      if (connectedDevice) {
        try {
          await ble.cancelDeviceConnection(connectedDevice.id);
        } catch (e) {
          logger.warn('기존 연결 해제 중 오류', e);
        }
      }

      
      logger.info(`Connecting to device: ${deviceId}`);
      const device = await ble.connectToDevice(deviceId, {
        requestMTU: 512, 
        autoConnect: false, 
        timeout: 10000, 
      });
      
      logger.info('Connected, discovering services...');
      await device.discoverAllServicesAndCharacteristics();
      
      
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

    
    const deviceId = connectedDevice.id;
    
    try {
      setError(null);
      logger.info(`Disconnecting from device: ${deviceId}`);
      
      
      await ble.cancelDeviceConnection(deviceId);
      logger.info('Successfully disconnected from device');
    } catch (err) {
      
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
      
      if (connectedDevice && connectedDevice.id === deviceId) {
        setConnectedDevice(null);
      }
    }
  };

  const scanForPeripherals = async () => {
    try {
      
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        throw new Error('Bluetooth 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.');
      }

      
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
      
      logger.info('알림 활성화 시도 중...');
      
      
      await targetDevice.writeCharacteristicWithResponseForService(
        serviceUUID,
        characteristicUUID,
        Buffer.from([0x01, 0x00]).toString('base64') 
      );
      
      logger.info('알림 활성화 성공');

      
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
              
              const rawData = characteristic.value;
              const buffer = Buffer.from(rawData, 'base64');
              
              
              const dataArray = new Uint8Array(buffer);
              
              
              const hexString = Array.from(dataArray)
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' ');
              
              
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
              
              
              setReceivedData(textString);
            } catch (parseError) {
              const error = parseError instanceof Error ? parseError : new Error(String(parseError));
              logger.error('데이터 파싱 중 오류 발생', error);
            }
          }
        },
        'monitor-' + characteristicUUID 
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
      
      
      try {
        await connectedDevice.writeDescriptorForService(
          serviceUUID,
          characteristicUUID,
          '00002902-0000-1000-8000-00805f9b34fb',
          Buffer.from([0x00, 0x00]).toString('base64') 
        );
        logger.info('알림 비활성화 성공');
      } catch (err) {
        logger.warn('알림 비활성화 실패', err);
      }
      
      
      
      
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



export default useBLE;