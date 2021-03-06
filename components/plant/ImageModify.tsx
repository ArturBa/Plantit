import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FieldHookConfig, useField } from 'formik';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../../constants';
import { View } from '../themed';

export type ImageModifyProps = FieldHookConfig<string> & {
  size?: number;
};

export function ImageModify(props: ImageModifyProps) {
  const [field, , helpers] = useField(props);
  const tintColor = colors.accentBasic;
  const backgroundColor = colors.background;
  const { size } = props;

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access media library was denied');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      return;
    }
    helpers.setValue(pickerResult.uri);
  };

  const styles = stylesSheet({ tintColor, size });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={openImagePicker}>
        <Image style={styles.image} source={{ uri: field.value }} />
      </TouchableOpacity>
      <View style={styles.editIcon}>
        <FontAwesome5 name="pencil-alt" size={16} color={backgroundColor} />
      </View>
    </View>
  );
}

ImageModify.defaultProps = {
  size: 100,
};

type ImageModifyStyleProps = {
  tintColor: string;
  size: number;
};

const stylesSheet = ({ tintColor, size }: ImageModifyStyleProps) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      height: size,
      width: size,
    },
    touchable: {
      height: '100%',
      width: '100%',
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: size / 2,
      overflow: 'hidden',
      borderColor: tintColor,
      borderWidth: 1,
    },
    editIcon: {
      backgroundColor: tintColor,
      position: 'absolute',
      height: 32,
      width: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 4,
      right: 4,
    },
  });
