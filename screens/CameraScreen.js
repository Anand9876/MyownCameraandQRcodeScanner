import React,{useState,useEffect} from 'react';
import { View,Text,Button,StyleSheet } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

function BarCodeScanner(){
  const[hasPermission,setHasPermission]=useState(null);
  const[scanned,setScanned]=useState(false);

  useEffect(()=>{
    (async()=>{
      const{status}= await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status==='granted')
    })();
  },[])
  const handleBarCodeScanned=({type,data})=>{
setScanned(true);
alert('QR code with type $(type) and data $(data) has been scanned')
}
if(hasPermission===null){
  return <Text>Requesting for camera permission.</Text>
}
if(hasPermission===false){
  return <Text>No access to camera.</Text>
}
return(
  <View style={styles.container}>
<BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={
  scanned?undefined:handleBarCodeScanned
}/>
{scanned&&<Button onPress={()=>{setScanned(false)}}></Button>}
  </View>
)
}
const styles=StyleSheet.create({
  container:{
flex:1,
flexDirection:'row',
justifyContent:'center'
  }
})
export default BarCodeScanner;