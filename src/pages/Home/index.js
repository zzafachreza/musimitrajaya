import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);



      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'musimitrajaya', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });

    if (isFocused) {
      __getDataUserInfo();
    }
    return unsubscribe;
  }, [isFocused]);


  const __getDataUserInfo = () => {
    getData('user').then(users => {
      setUser(users);
      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            console.error('update token', res.data);
          });
      });
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;

  const DataKategori = ({
    icon,
    nama,
    nama2,
    onPress,
    warna = colors.primary,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: warna,
          padding: 5,
          borderRadius: 10,
          width: windowWidth / 2.5,
          height: windowHeight / 5.3,
          elevation: 5,
          justifyContent: 'center',
        }}>
        <View>
          <Icon
            type="ionicon"
            name={icon}
            color={colors.primary}
            size={windowWidth / 5}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.primary,
              fontSize: windowWidth / 30,
              textAlign: 'center',

            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              color: colors.tertiary,
              fontSize: windowWidth / 35,
              textAlign: 'center',
            }}>
            {nama2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>

      <View
        style={{
          backgroundColor: colors.primary,
          height: windowHeight / 9,
          padding: 10,
          flexDirection: 'row',
        }}>


        <View style={{ paddingLeft: 10, flex: 1 }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.white,
              fontFamily: fonts.secondary[600],
            }}>
            Welcome, <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.white,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 20,
              color: colors.white,
              fontFamily: fonts.secondary[600],
            }}>
            {user.nama_departement}
          </Text>

        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={require('../../assets/avatar.png')} style={{
            width: 50,
            resizeMode: 'contain'
          }} />
        </TouchableOpacity>

      </View>
      <View style={{
        flexDirection: 'row',
        backgroundColor: colors.primary,
        padding: 10,
        marginBottom: 10,
      }} >
        <View style={{
          flex: 1,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
          <Text style={{
            fontSize: windowWidth / 10,
            color: colors.tertiary,
            fontFamily: fonts.secondary[600],
          }}
          >24</Text>
          <Text style={{
            fontSize: windowWidth / 25,
            color: colors.tertiary,
            fontFamily: fonts.secondary[400],
            textAlign: 'center'
          }}>Daily Activity GE - ACI -MMJ Road Matenance</Text>
        </View>
        <View style={{
          flex: 0.01,
          backgroundColor: colors.primary,
          marginHorizontal: 0.5,
          justifyContent: 'center',
          alignItems: 'center'
        }}></View>
        <View style={{
          flex: 1,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
          <Text style={{
            fontSize: windowWidth / 10,
            color: colors.tertiary,
            fontFamily: fonts.secondary[600],
          }}
          >4</Text>
          <Text style={{
            fontSize: windowWidth / 25,
            color: colors.tertiary,
            fontFamily: fonts.secondary[400],
            textAlign: 'center'
          }}> Activity GE - ACI -MMJ Rock Layering</Text>
        </View>
      </View>



      <MyCarouser />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 15,
        }}>
        <DataKategori
          warna={colors.secondary}
          onPress={() => navigation.navigate('AddLaporanDaily', user)}
          icon="duplicate"
          nama="Tambah Laporan Daily Activity"

        />
        <DataKategori
          warna={colors.secondary}
          onPress={() => navigation.navigate('DaftarLaporanDaily')}
          icon="list"
          nama="Daftar Laporan Daily Activity"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 15,
        }}>
        <DataKategori
          warna={colors.secondary}
          onPress={() => navigation.navigate('AddLaporan')}
          icon="duplicate"
          nama="Tambah Laporan Activity"
        />
        <DataKategori
          warna={colors.secondary}
          onPress={() => {

            navigation.navigate('DaftarLaporan')

          }
          }
          icon="list"
          nama="Daftar Laporan Activity"
        />
      </View>



    </SafeAreaView>
  );
}
