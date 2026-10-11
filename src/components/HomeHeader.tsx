import { StyleSheet, Text, View } from 'react-native';


export default function HomeHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View >
      <Text style={styles.date}>{currentDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 30,
  },
});