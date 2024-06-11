import React, { useEffect, useState } from 'react';
import { StyleSheet, View,Text,Button,Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';



export default function Scanner(){
    const [hasPermission,setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    useEffect(()=>{
        (
            async ()=>{
                const { state } = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            }
        )();
        
    },
    []
       
    )
    const handelBarCodeScanned =({type,data})=>{
        setScanned(true);
        alert(`Bar Code with Type ${type} and Data ${Linking.openURL(`${data}`)} has been scanned`)
    };
    if(hasPermission === null){
        return <Text>
            Requesting for camera Permission
        </Text>
    }
    if(hasPermission === false){
        return <Text>
            No Access to Camera
        </Text>
    }
    return(
        <View>
            <BarCodeScanner
            onBarCodeScanned={scanned ? undefined:handelBarCodeScanned}
            >
                {scanned && <Button title='Tap to scann Again' onPress={()=> setScanned(false)}/>}
            </BarCodeScanner>
        </View>
    )
    
};
const Styles=StyleSheet.create({
    container :{
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    }
})
