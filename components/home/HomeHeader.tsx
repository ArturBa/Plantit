import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

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
        <Text style={Typography.subtitle_1}>Take care of your plants</Text>
        <Button onPress={onNewPlantPress} title="Add" variant="inline" />
      </View>
    </View>
  );
}

const styleSheet = (accentColor: string) =>
  StyleSheet.create({
    container: {
      marginTop: 24,
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
  });
