import { StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, Typography } from '../../constants';
import { Button, Text, View } from '../Themed';

export function HomeHeader() {
  const accentColor = colors.accentBasic;

  const navigation = useNavigation();
  const onNewPlantPress = () => {
    navigation.navigate('PlantAddModal');
  };

  const styles = styleSheet(accentColor);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back</Text>
      <View style={styles.subheader}>
        <Text style={styles.subheader_text}>Take care of your plants</Text>
        <Button onPress={onNewPlantPress} variant="inline" title="Add" />
      </View>
    </View>
  );
}

const styleSheet = (accentColor: string) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginTop: StatusBar.currentHeight ?? 0 + 16,
      marginBottom: 24,
    },
    header: {
      color: accentColor,
      ...Typography.title_1,
    },
    subheader: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    subheader_text: {
      ...Typography.subtitle_1,
    },
  });
