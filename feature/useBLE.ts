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
}

function useBLE(): BluetoothLowEnergyApi {
  const ble = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

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

  return {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice,
  } as const;
}


export default useBLE;