import {AtRule} from "csstype";
import Navigation = AtRule.Navigation;
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types/RootStackParamList";
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";
import {Reservation} from "../../domain/core/Reservation";
import {inject} from "inversify";
import GetTicket from "../../application/usecase/GetTicket";
import {useInject} from "inversify-hooks";
import {useInjection} from "../hooks/ioc.react";

type Props = NativeStackScreenProps<RootStackParamList>;

export default function TicketsDetails({route, navigation}: Props) {
    const {user} = useAuth();
    const ticketUC = useInjection<GetTicket>(GetTicket);
    const [ticket, setTicket] = useState<Reservation>();
    const [loading, setLoading] = useState(true);
    // const {token} = route.params;

    useEffect(() => {
        if (!user) {
            navigation.navigate("Mon compte", {screen: "Login"});
            return;
        }

        // TODO Mettre le vrai token
        ticketUC.execute("token").then(result => {
            setTicket(result);

        })


    })

}