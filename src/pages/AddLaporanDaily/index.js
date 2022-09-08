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


export default function ({ navigation }) {

    const myDate = new Date();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    useState(() => {
        getData('user').then(u => {
            setUser(u)
        })
    }, [])

    const getToday = () => {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            month = '0' + month;
        }
        if (day.toString().length == 1) {
            day = '0' + day;
        }
        if (hour.toString().length == 1) {
            hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            second = '0' + second;
        }
        var dateTime = year + '-' + month + '-' + day;
        return dateTime;
    }
    const [kirim, setKirim] = useState({});

    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {

            const send = {
                tipe: 'DAILY',
                tanggal: selectedDate,
                fid_user: user.id,
                area: kirim.area
            }


            console.log('send', send);

            axios.post(urlAPI + 'v1_add_laporan.php', send).then(res => {
                // console.log(res.data)

                if (res.data.status == 200) {
                    Alert.alert('Musi Mitra Jaya', res.data.messege);
                    navigation.replace('AddLaporanList', {
                        kode: res.data.kode
                    })
                } else {
                    console.warn(res.data.messege);
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
                }}>TAMBAH LAPORAN</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 25,
                    color: colors.white,
                    marginBottom: 10,
                }}>Daily Activity GE - ACI -MMJ Road Matenance</Text>
            </View>
            <ScrollView style={{
                padding: 10,
            }} showsVerticalScrollIndicator={false}>

                <DatePicker
                    mode="calendar"

                    selected={getToday()}
                    options={{
                        selectedTextColor: colors.primary,
                        defaultFont: 'Montserrat-Regular',
                        headerFont: 'Montserrat-SemiBold',
                        textHeaderColor: colors.primary,
                        textDefaultColor: colors.black,
                        selectedTextColor: colors.white,
                        mainColor: colors.primary,
                        textSecondaryColor: colors.secondary,
                        borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                    onSelectedChange={date => {
                        setSelectedDate(date);

                        // console.log(date)
                    }}
                />
                <MyInput icon={false} label="Work Area" onChangeText={x => setKirim({
                    ...kirim,
                    area: x
                })} />
                <MyGap jarak={20} />








                {!loading && <MyButton onPress={sendServer} title="SUBMIT" warna={colors.primary} Icons="create-outline" />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
            </ScrollView>


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})