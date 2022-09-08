import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    ActivityIndicator,
    FlatList,
    Alert
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { MyButton, MyGap, MyInput } from '../../components';
import { showMessage } from 'react-native-flash-message';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { maskJs, maskCurrency } from 'mask-js';

export default function ({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        kode: route.params.kode
    });

    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {

            console.log('send', kirim);

            axios.post(urlAPI + 'v1_add_unit.php', kirim).then(res => {
                console.log(res.data)

                if (res.data.status == 200) {
                    Alert.alert('Musi Mitra Jaya', res.data.messege);
                    navigation.goBack();
                }
            })

            setLoading(false)
        }, 1200)
    }


    return (
        <SafeAreaView style={{

            flex: 1,
        }}>
            <View style={{
                backgroundColor: colors.primary,
                padding: 20,
                justifyContent: 'center',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.white,
                    marginBottom: 5,
                }}>TAMBAH</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 25,
                    color: colors.white,
                    marginBottom: 10,
                }}>MA & UA Unit</Text>
            </View>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>



                <MyInput icon={false} label="Nama Unit" onChangeText={x => setKirim({
                    ...kirim,
                    nama_unit: x
                })} />
                <MyGap jarak={10} />
                <MyInput icon={false} label="Nama Vendor" onChangeText={x => setKirim({
                    ...kirim,
                    nama_vendor: x
                })} />

                <MyGap jarak={10} />
                <MyInput icon={false} label="MA & UA Unit" onChangeText={x => setKirim({
                    ...kirim,
                    unit: x
                })} />
                <MyGap jarak={10} />
                <MyInput multiline icon={false} label="Keterangan" onChangeText={x => setKirim({
                    ...kirim,
                    keterangan: x
                })} />



                <MyGap jarak={20} />








                {!loading && <MyButton onPress={sendServer} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
            </ScrollView>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})