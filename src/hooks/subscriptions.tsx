import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import Toast from "../components/Toast";
import subscriptions from "../services/routes/subscriptions";
import { useAuth } from "./auth";

interface ISubscriptionContextData {
  subscription?: TSubscription;
  setSubscription: Dispatch<SetStateAction<TSubscription | undefined>>;
  allSubscriptions: TSubscription[];
  setAllSubscriptions: Dispatch<SetStateAction<TSubscription[]>>;
}
const SubscriptionContext = createContext<ISubscriptionContextData>(
  {} as ISubscriptionContextData,
);

export type TSubscription = {
  nome: string;
  numInscr: string;
  plano: string;
  patrocinadora: string;
  situacao: string;
  codPlano: string;
  processo: string | null;
};

export default function SubscriptionsProvider({ children }: any) {
  const [subscription, setSubscription] = useState<TSubscription>();
  const [allSubscriptions, setAllSubscriptions] = useState<TSubscription[]>([]);

  const { user, setName, onlyBack } = useAuth();

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const data = await subscriptions({
          codPes: user.codPes,
        });

        if (data.length < 1) {
          Toast({
            message: "Usuário não possui inscrições",
            description: "Por favor, tente novamente mais tarde",
            type: "info",
            icon: "info",
            position: "top",
          });

          onlyBack();

          return;
        }

        setAllSubscriptions(data);
        setSubscription(data[0]);
        setName(data[0].nome);
      } catch (error) {
        Toast({
          message: "Erro ao carregar inscrições",
          description: "Por favor abra novamente o aplicativo",
          type: "danger",
          icon: "danger",
          autoHide: false,
          hideOnPress: false,
          position: "center",
        });
      }
    }

    if (user?.codPes) {
      fetchSubscription();
    }
  }, [user.codPes, onlyBack, setName]);

  return (
    <SubscriptionContext.Provider
      value={{
        setSubscription,
        subscription,
        allSubscriptions,
        setAllSubscriptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

function useSubscription(): ISubscriptionContextData {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscription must be used within an SubscriptionsProvider",
    );
  }

  return context;
}

export { SubscriptionsProvider, useSubscription };
