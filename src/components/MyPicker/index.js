import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.black,
            left: 0,
            fontSize: 12,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>

      <View style={{
        backgroundColor: colors.secondary,
        borderRadius: 10,
        fontFamily: fonts.secondary[600],
        borderColor: colors.primary,
      }}>
        <Picker style={{ height: 50, transform: [{ scale: 0.9 }] }}
          selectedValue={value} onValueChange={onValueChange}>
          {data.map(item => {
            return <Picker.Item textStyle={{ fontSize: 12 }} value={item.value} label={item.label} />;
          })}
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
