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
import { useIsFocused } from '@react-navigation/native';

export default function ({ navigation, route }) {
    const isFocused = useIsFocused();
    const kode = route.params.kode;

    useEffect(() => {
        if (isFocused) {
            getAktifitas();
            getCuaca();
            getMaterial();
            getUnit();
            getFoto();
        }
    }, [isFocused])

    const MyList = ({ image, label, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={{
                flex: 1,
                borderRadius: 10,
                backgroundColor: colors.primary,
                padding: 10,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={image} style={{
                    height: 35,
                    resizeMode: 'contain',
                    marginBottom: 5,
                }} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 12
                }}>{label}</Text>
            </TouchableOpacity>
        )
    }


    const [aktifitas, setAktifitas] = useState([
        {
            id: 'Belum ada laporan',
        }
    ])


    const [cuaca, setCuaca] = useState([
        {
            id: 'Belum ada laporan',
        }
    ])

    const [material, setMaterial] = useState([
        {
            id: 'Belum ada laporan',
        }
    ])

    const [unit, setUnit] = useState([
        {
            id: 'Belum ada laporan',
        }
    ])


    const [foto, setFoto] = useState([
        {
            id: 'Belum ada laporan',
        }
    ])



    const getCuaca = () => {

        axios.post(urlAPI + 'v1_data_cuaca.php', {
            kode: route.params.kode
        }).then(res => {
            console.warn(res.data);
            setCuaca(res.data)
        })

    }


    const getAktifitas = () => {

        axios.post(urlAPI + 'v1_data_aktifitas.php', {
            kode: route.params.kode
        }).then(res => {
            console.warn(res.data);
            setAktifitas(res.data)
        })

    }



    const getMaterial = () => {

        axios.post(urlAPI + 'v1_data_material.php', {
            kode: route.params.kode
        }).then(res => {
            console.warn(res.data);
            setMaterial(res.data)
        })

    }

    const getUnit = () => {

        axios.post(urlAPI + 'v1_data_unit.php', {
            kode: route.params.kode
        }).then(res => {
            console.warn(res.data);
            setUnit(res.data)
        })

    }


    const getFoto = () => {

        axios.post(urlAPI + 'v1_data_foto.php', {
            kode: route.params.kode
        }).then(res => {
            console.warn(res.data);
            setFoto(res.data)
        })

    }




    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
        }}>
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                }}>
                    <MyList onPress={() => navigation.navigate('AddLaporan2', {
                        kode: kode
                    })} label="Aktifitas Unit" image={require('../../assets/aktifitas.png')} />

                    <MyList onPress={() => navigation.navigate('AddLaporan3', {
                        kode: kode
                    })} label="Kondisi Cuaca" image={require('../../assets/cuaca.png')} />
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                }}>
                    <MyList onPress={() => navigation.navigate('AddLaporanDaily1', {
                        kode: kode
                    })} label="Material" image={require('../../assets/material.png')} />
                    <MyList onPress={() => navigation.navigate('AddLaporanDaily2', {
                        kode: kode
                    })} label="MA & UA Unit" image={require('../../assets/unit.png')} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                }}>
                    <MyList onPress={() => navigation.navigate('AddLaporanDaily3', {
                        kode: kode
                    })} label="Photo Daily Activity" image={require('../../assets/foto.png')} />
                </View>



                {/* Aktifitas Unit */}
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                    }}>Aktifitas Unit
                    </Text>

                    {aktifitas.map(r => {
                        return (
                            <View style={{
                                borderRadius: 10,
                                backgroundColor: colors.white,
                                marginVertical: 2,
                                padding: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}>{r.jam_mulai}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}> - </Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}>{r.jam_selesai}</Text>
                                </View>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 14,
                                }}>{r.sta}, {r.nama_unit}, {r.nama_vendor}, {r.material}, {r.activity}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 9,
                                    color: colors.primary,
                                    textAlign: 'right'
                                }}>{r.last_update}</Text>
                            </View>
                        )
                    })}

                </View>


                {/* Kondisi Cuaca */}
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                    }}>Kondisi Cuaca
                    </Text>

                    {cuaca.map(r => {
                        return (
                            <View style={{
                                borderRadius: 10,
                                backgroundColor: colors.white,
                                marginVertical: 2,
                                padding: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}>{r.jam_mulai}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}> - </Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}>{r.jam_selesai}</Text>
                                </View>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 14,
                                }}>{r.cuaca}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: 9,
                                    color: colors.primary,
                                    textAlign: 'right'
                                }}>{r.last_update}</Text>
                            </View>
                        )
                    })}

                </View>

                {/* Material */}
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                    }}>Material
                    </Text>

                    {material.map(r => {
                        return (
                            <View style={{
                                borderRadius: 10,
                                backgroundColor: colors.white,
                                marginVertical: 2,
                                padding: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        flex: 0.3,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                    }}>Nama Material</Text>
                                    <Text style={{
                                        flex: 0.05,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}> : </Text>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}>{r.nama_material}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        flex: 0.3,
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 12,
                                    }}>Keterangan</Text>
                                    <Text style={{
                                        flex: 0.05,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}> : </Text>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}>{r.keterangan}</Text>
                                </View>




                            </View>
                        )
                    })}

                </View>

                {/* Unit */}
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                    }}>MA & UA Unit
                    </Text>

                    {unit.map(r => {
                        return (
                            <View style={{
                                borderRadius: 10,
                                backgroundColor: colors.white,
                                marginVertical: 2,
                                padding: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        flex: 1,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 12,
                                    }}>{r.nama_unit}, {r.nama_vendor}, {r.unit}, {r.keterangan}</Text>

                                </View>


                            </View>
                        )
                    })}

                </View>


                {/* Foto */}
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                    }}>Photo Daily Activity
                    </Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {foto.map(r => {
                            return (
                                <View style={{
                                    backgroundColor: colors.white,
                                    marginHorizontal: 10,

                                }}>

                                    <Image source={{
                                        uri: r.foto_sebelum
                                    }} style={{
                                        width: 250,
                                        height: 250
                                    }} />
                                    <Text style={{
                                        margin: 5,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: windowWidth / 35,
                                    }}>{r.keterangan}</Text>

                                    <Text style={{
                                        fontFamily: fonts.secondary[400],
                                        fontSize: 9,
                                        margin: 5,
                                        color: colors.primary,
                                        textAlign: 'right'
                                    }}>{r.last_update}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>

                </View>
            </ScrollView>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({})