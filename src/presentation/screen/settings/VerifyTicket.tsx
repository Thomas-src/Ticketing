import {useState} from 'react';
import {Button, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/RootStackParamList';
import {CameraView, useCameraPermissions} from 'expo-camera';
import {useQrScanner} from '../../hooks/useQrScanner';
import {useNfcScanner} from '../../hooks/useNfcScanner';
import {VerifyResult} from '../../../types/ScreenType';
import {colors} from '../../colors';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyTicket'>;

type ScanMode = null | 'qr' | 'nfc';

function showMessage(response: VerifyResult | null): string {
    let res = '';

    if (response == null) {
        return res;
    }

    if (response.ok) {
        return 'Ticket valide';
    }

    switch (response.reason) {
        case 'already_scanned':
            res = 'Ticket déjà scanné';
            break;

        case 'not_found':
            res = 'Ticket invalide';
            break;

        default:
        case 'error':
            res = "Une erreur s'est produite";
            break;
    }

    return res;
}

function CameraScanner({onBarcodeScanned,}: { onBarcodeScanned: (e: { data: string }) => void; }) {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return (
            <Text style={styles.cameraLoading}>
                Chargement de la caméra...
            </Text>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.cameraPermissionContainer}>
                <Text style={styles.cameraLoading}>
                    Nous avons besoin de la caméra pour scanner les tickets
                </Text>

                <Button
                    onPress={requestPermission}
                    title="Autoriser la caméra"
                />
            </View>
        );
    }

    return (
        <CameraView
            style={styles.cameraView}
            facing="back"
            onBarcodeScanned={onBarcodeScanned}
            barcodeScannerSettings={{
                barcodeTypes: ['qr'],
            }}
        />
    );
}

export default function VerifyTicket({route}: Props) {
    const {eventId} = route.params;
    const [mode, setMode] = useState<ScanMode>(null);
    const {result: qrResult, handleBarcodeScanned, resetScan: resetQr} = useQrScanner(eventId);

    const {result: nfacResult, nfcStatus, scan, cancel: cancelNfc, resetScan: resetNfc} = useNfcScanner(eventId);

    const result = qrResult ?? nfacResult;

    const resetScan = () => {
        resetQr();
        resetNfc();
    };

    const handleSelectMode = async (selected: ScanMode) => {
        await cancelNfc();
        resetScan();
        setMode(selected);

        if (selected === 'nfc') {
            scan();
        }
    };

    const statusColor = result?.ok ? colors.green : result?.reason === 'already_scanned' ? colors.warn : colors.red;

    const statusIcon = result?.ok ? '✅' : result?.reason === 'already_scanned' ? '⚠️' : '❌';

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>
                Vérification des tickets
            </Text>

            {mode === 'qr' && (
                <CameraScanner
                    onBarcodeScanned={handleBarcodeScanned}
                />
            )}

            {mode === 'nfc' && (
                <View style={styles.nfcContainer}>
                    <Text style={styles.nfcIcon}>📡</Text>

                    <Text style={styles.cameraLoading}>
                        {nfcStatus === 'scanning' ? 'Approchez le badge…' : nfcStatus === 'unsupported' ? 'Lecteur de puce non supporté sur cet appareil' : 'Appuyez-ci dessous pour activer le scan'}
                    </Text>
                </View>
            )}

            <View style={styles.modeButtonsContainer}>
                <TouchableOpacity
                    onPress={() => handleSelectMode('qr')}
                    style={[styles.modeButton,
                        mode === 'qr' ? styles.modeButtonActive : styles.modeButtonInactive,
                    ]}
                >
                    <Text style={styles.modeButtonText}>
                        QR-Code
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleSelectMode('nfc')}
                    disabled={nfcStatus === 'scanning'}
                    style={[
                        styles.modeButton,
                        mode === 'nfc' ? styles.modeButtonActive : styles.modeButtonInactive,
                        nfcStatus === 'scanning' && styles.modeButtonDisabled,
                    ]}
                >
                    <Text style={styles.modeButtonText}>
                        Badge
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal visible={result !== null} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalContainer,
                            {
                                borderTopColor: statusColor,
                            },
                        ]}
                    >
                        <Text style={styles.modalIcon}>
                            {statusIcon}
                        </Text>

                        <Text
                            style={[
                                styles.modalTitle,
                                {
                                    color: statusColor,
                                },
                            ]}
                        >
                            {showMessage(result)}
                        </Text>

                        {(result?.ok || result?.reason === 'already_scanned') && result?.reservation && (
                            <View style={styles.reservationContainer}>
                                <Text style={styles.reservationName}>
                                    {result.reservation.owner?.name}{' '}
                                    {result.reservation.owner?.surname}
                                </Text>

                                <Text style={styles.reservationQuantity}>
                                    {result.reservation.quantity} place
                                    {result.reservation.quantity > 1 ? 's' : ''}
                                </Text>

                                {result.reservation.guests?.length > 0 && (
                                    <ScrollView style={styles.guests} showsVerticalScrollIndicator={false}>
                                        {result.reservation.guests.map((guest: string, index: number) => (
                                            <Text key={index} style={{fontSize: 13, color: colors.blue}}>
                                                • {guest}
                                            </Text>
                                        ))}
                                    </ScrollView>
                                )}
                            </View>
                        )}

                        <TouchableOpacity
                            onPress={resetScan}
                            style={[styles.modalButton,
                                {
                                    backgroundColor: statusColor,
                                },
                            ]}
                        >
                            <Text style={styles.modalButtonText}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },

    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },

    cameraLoading: {
        fontSize: 16,
        textAlign: 'center',
    },

    cameraPermissionContainer: {
        alignItems: 'center',
        gap: 12,
    },

    cameraView: {
        flex: 1,
        width: '100%',
    },

    nfcContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },

    nfcIcon: {
        fontSize: 48,
    },

    modeButtonsContainer: {
        flexDirection: 'row',
        gap: 12,
        padding: 16,
        paddingBottom: 32,
    },

    modeButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: colors.darkBlue,
    },

    modeButtonActive: {
        backgroundColor: colors.blue,
    },

    modeButtonInactive: {
        backgroundColor: colors.inactive,
    },

    modeButtonDisabled: {
        opacity: 0.6,
    },

    modeButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '600',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
    },

    modalContainer: {
        backgroundColor: colors.white,
        padding: 24,
        borderRadius: 16,
        minWidth: 280,
        alignItems: 'center',
        borderTopWidth: 6,
    },

    modalIcon: {
        fontSize: 48,
        marginBottom: 8,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },

    reservationContainer: {
        alignItems: 'center',
        marginBottom: 16,
        gap: 4,
    },

    reservationName: {
        fontSize: 15,
        color: '#374151',
    },

    reservationQuantity: {
        fontSize: 13,
        color: colors.blue,
    },

    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 10,
    },

    modalButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
    },
    guests: {
        maxHeight: 150,
        width: '100%',
    }
});