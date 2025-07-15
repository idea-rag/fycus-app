import { Buffer } from 'buffer';
import * as ExpoDevice from 'expo-device';
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";


/* eslint-disable no-bitwise */
interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevices: Device[];
    connectToDevice(deviceId: string): Promise<Device>;
    disconnectFromDevice(): Promise<void>;
    connectedDevice: Device | null;
    startListeningToCharacteristic(serviceUUID: string, characteristicUUID: string): Promise<void>;
    stopListeningToCharacteristic(serviceUUID: string, characteristicUUID: string): Promise<void>;
    receivedData: string;
}

function useBLE(): BluetoothLowEnergyApi {
  const ble = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [receivedData, setReceivedData] = useState<string>('');

  const requestAndroid31Permissions = async () => {
    console.log("requestAndroid31Permissions called");
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

  const requestPermissions = async () => {
    console.log("requestPermissions called");
    console.log("platformApiLevel", ExpoDevice.platformApiLevel);
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        console.log("platformApiLevel < 31");
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                      title: "Location Permission",
                      message: "Bluetooth Low Energy requires Location",
                      buttonPositive: "OK",
                  }
              );
              return granted === PermissionsAndroid.RESULTS.GRANTED;
          } else {
              const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
              return isAndroid31PermissionsGranted;
          }
      } else {
          return true;
      }
  }

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.some((device) => nextDevice.id === device.id);

  const connectToDevice = async (deviceId: string) => {
    try {
      const device = await ble.connectToDevice(deviceId);
      await device.discoverAllServicesAndCharacteristics();
      setConnectedDevice(device);
      return device;
    } catch (error) {
      console.log('BLE 연결 실패:', error);
      throw error;
    }
  };

  const disconnectFromDevice = async () => {
    if (connectedDevice) {
      try {
        await ble.cancelDeviceConnection(connectedDevice.id);
        setConnectedDevice(null);
      } catch (error) {
        console.log('BLE 연결 해제 실패:', error);
        throw error;
      }
    }
  };

  const scanForPeripherals = () => {
    ble.stopDeviceScan();
    setAllDevices([]);
    ble.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('BLE Scan Error:', error);
        ble.stopDeviceScan();
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
  };

  const startListeningToCharacteristic = async (serviceUUID: string, characteristicUUID: string) => {
    if (!connectedDevice) {
      throw new Error('No device connected');
    }
    
    try {
      await connectedDevice.monitorCharacteristicForService(
        serviceUUID,
        characteristicUUID,
        (error, characteristic) => {
          if (error) {
            console.log('Error monitoring characteristic:', error);
            return;
          }
          if (characteristic) {
            const data = characteristic.value;
            if (data) {
              const decodedData = Buffer.from(data, 'base64').toString();
              setReceivedData(decodedData);
              console.log('Received data:', decodedData);
            }
          }
        }
      );
    } catch (error) {
      console.log('Error setting up monitoring:', error);
      throw error;
    }
  };

  const stopListeningToCharacteristic = async (serviceUUID: string, characteristicUUID: string) => {
    if (connectedDevice) {
      try {
        //@ts-ignore
        await connectedDevice.stopMonitoringCharacteristic(
          serviceUUID,
          characteristicUUID
        );
      } catch (error) {
        console.log('Error stopping monitoring:', error);
        throw error;
      }
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