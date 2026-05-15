import {Button, Modal, Text, View} from 'react-native';
import {styles} from '../../styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStackParamList';
import {CameraView, useCameraPermissions} from 'expo-camera';
import {useQrScanner} from '../../hooks/useQrScanner';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyTicket'>;

export default function VerifyTicket({route}: Props) {
    const {eventId} = route.params;
    const [permission, requestPermission] = useCameraPermissions();

    const {result, handleBarcodeScanned, resetScan} = useQrScanner(eventId);

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Chargement de la caméra...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    Nous avons besoin de la caméra pour scanner les tickets
                </Text>
                <Button onPress={requestPermission} title="Autoriser la caméra"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan des tickets en cours...</Text>

            <CameraView
                style={{flex: 1, width: '100%'}}
                facing="back"
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
            />

            <Modal visible={result !== null} transparent animationType="fade">
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 12,
                        minWidth: 250,
                        alignItems: 'center',
                    }}>
                        <Text style={{fontSize: 18, marginBottom: 10}}>
                            {result?.message}
                        </Text>

                        <Button title="OK" onPress={resetScan}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}