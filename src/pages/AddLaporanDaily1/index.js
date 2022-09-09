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
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { showMessage } from 'react-native-flash-message';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { maskJs, maskCurrency } from 'mask-js';

export default function ({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        kode: route.params.kode,
        nama_material: 'Batu BC'
    });


    const _material = [
        { label: 'Batu BC', value: 'Batu BC' },
        { label: 'Batu 3/5', value: 'Batu 3/5' },
        { label: 'Batu 5/7', value: 'Batu 5/7' },
        { label: 'Soil', value: 'Soil' },
        { label: 'Clay', value: 'Clay' },
        { label: 'Mix Material', value: 'Mix Material' },
        { label: 'Fly Ash', value: 'Fly Ash' },
        { label: 'Bottom Ash', value: 'Bottom Ash' },
        { label: 'Other', value: 'Other' },

    ]

    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {

            console.log('send', kirim);

            axios.post(urlAPI + 'v1_add_material.php', kirim).then(res => {
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
                }}>Material</Text>
            </View>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>



                <MyPicker label="Material" onValueChange={x => setKirim({
                    ...kirim,
                    nama_material: x
                })} data={_material} />


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