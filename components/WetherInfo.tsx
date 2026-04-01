import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
interface IProps {
    location: string;
    temperature: number;
    condition: string;
};

export const WeatherInfo: FC<IProps> = ({ location, temperature, condition }) => {
    return (
        <View style={styles.weatherInfo}>
            <Text style={styles.text}>Location: {location}</Text>
            <Text style={styles.text}>Temperature: {temperature}</Text>
            <Text style={styles.text}>Condition: {condition}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    weatherInfo: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#000',
        padding: 20,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        marginVertical: 5,
    },
});
