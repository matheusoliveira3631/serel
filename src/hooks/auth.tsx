import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

import * as SecureStore from "expo-secure-store";

import Toast from "../components/Toast";
import api from "../services/api";
import authenticate from "../services/routes/authenticate";

interface ISignCredentials {
  cpf: string;
  password: string;
}

type UserData = {
  codPes: string;
  name: string;
  cpf: string;
  alreadyLogged: boolean;
};

interface IAuthContextData {
  isSigned: boolean;
  signIn(credentials: ISignCredentials): Promise<void>;
  signOut(): void;
  onlyBack(): void;
  setName(name: string): void;
  user: UserData;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserData>(() => {
    return {
      codPes: "",
      name: "",
      cpf: "",
      alreadyLogged: false,
    };
    // return {
    //   name: "EUGENIO MANOEL DE ARAUJO DIAS",
    //   codPes: "000685",
    //   cpf: "26698722120",
    // };
  });

  useEffect(() => {
    SecureStore.getItemAsync("anabb-prev_user_cpf").then(userCPF => {
      if (userCPF) {
        setUser(state => ({
          ...state,
          cpf: userCPF,
        }));
      }
    });
  }, []);

  // const [isSigned, setIsSigned] = useState(true);
  const [isSigned, setIsSigned] = useState(false);

  const setName = useCallback((name: string) => {
    setUser(state => ({
      ...state,
      name,
    }));
  }, []);

  const signIn = useCallback(async ({ cpf, password }: ISignCredentials) => {
    try {
      const { codPes, token } = await authenticate({
        cpf,
        password,
      });

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      await SecureStore.setItemAsync("anabb-prev_user_cpf", cpf);
      await SecureStore.setItemAsync("anabb-prev_user_password", password);

      setUser(state => ({ ...state, codPes, cpf, alreadyLogged: true }));

      setIsSigned(true);
    } catch (error) {
      Toast({
        message: "Erro ao acessar",
        description: "Por favor verifique suas informações",
        type: "danger",
        duration: 5000,
        icon: "danger",
      });

      throw new Error("Erro ao acessar");
    }
  }, []);

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync("anabb-prev_user_cpf");
    await SecureStore.deleteItemAsync("anabb-prev_user_password");

    setUser({
      codPes: "",
      name: "",
      cpf: "",
      alreadyLogged: false,
    });
    setIsSigned(false);
  }, []);

  // APAGAR DEPOIS
  const onlyBack = useCallback(() => {
    setIsSigned(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSigned,
        signIn,
        signOut,
        user,
        onlyBack,
        setName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
