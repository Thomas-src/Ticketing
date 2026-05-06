import { StyleSheet, View, Text } from "react-native";
import {colors} from "../../colors";
import {Calendar, Calendar1} from "lucide-react-native";
import {styles} from "../../styles";



type Props = {
    beginDate?: Date;
    endDate?: Date;
};

export default function ContextWhenCard({ beginDate, endDate }: Props) {

    if (!beginDate || !endDate) {
        return null;
    }

    const sameDay =
        beginDate.getFullYear() === endDate.getFullYear() &&
        beginDate.getMonth() === endDate.getMonth() &&
        beginDate.getDate() === endDate.getDate();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("fr-BE", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("fr-BE", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <View style={cardStyles.container}>
            <View style={cardStyles.fContainer} >
                <Calendar color={colors.white} />
                <Text style={[cardStyles.w, cardStyles.title]}>Quand ?</Text>
            </View>

            <View style={cardStyles.sContainer}>
                {sameDay ? (
                    <Text style={cardStyles.w}>
                        Le {formatDate(beginDate)} de {formatTime(beginDate)} à {formatTime(endDate)}
                    </Text>
                ) : (
                    <Text style={cardStyles.w}>
                        Du {formatDate(beginDate)} {formatTime(beginDate)}{" \n"}
                        au {formatDate(endDate)} {formatTime(endDate)}
                    </Text>
                )}
            </View>
        </View>
    );
}

const cardStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightBlue,
        borderRadius: 12,
        padding: 10,
    },
    w : {
        color: colors.white,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
    },
    fContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    sContainer: {
        padding: 8,
    }
});