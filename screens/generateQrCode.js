import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function GeneretQrCode  () {
  const [qrData, setQrData] = useState('');
  const qrRef = useRef(null);

  const handleQrDataChange = (value) => {
    setQrData(`Qrcode: ${value}`);
  };

  const captureAndSaveQrCode = async () => {
    try {
      const image = await qrRef.current.toDataURL();
      const fileName = `qr_code_${Date.now()}.png`;
      const localUri = `${FileSystem.cacheDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(localUri, image, { encoding: FileSystem.EncodingType.Base64 });
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(localUri);
        alert('QR code saved to gallery');
      } else {
        alert('Permission to access media library denied');
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        {qrData ? (
          <QRCodeSVG
            value={qrData}
            size={300}
            color="black"
            backgroundColor="white"
            ref={qrRef}
          />
        ) : (
          <Text style={styles.qrText}>Enter Data To Generate QR</Text>
        )}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={handleQrDataChange}
        placeholder="Enter Data"
      />
      <View style={styles.buttonContainer}>
        <Button title="Export" onPress={captureAndSaveQrCode} />
        <Button title="Go To Scan" onPress={() => navigation.navigate('QRScanner')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qrText: {
    fontSize: 20,
    color: 'indigo',
  },
  input: {
    width: Dimensions.get('window').width * 0.9,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

