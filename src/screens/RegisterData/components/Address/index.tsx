import { useRef, useEffect, useCallback, useState } from "react";
import { View, Platform } from "react-native";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";

import Button from "../../../../components/form/Button";
import InputProfile from "../../../../components/form/InputProfile";
import InputProfileMask from "../../../../components/form/InputProfileMask";
import Select from "../../../../components/form/Select";
import Toast from "../../../../components/Toast";
import { useAuth } from "../../../../hooks/auth";
import { useTheme } from "../../../../hooks/theme";
import getCityList, {
  TCity,
} from "../../../../services/routes/screens/resources/getCityList";
import { TUF } from "../../../../services/routes/screens/resources/getUFList";
import postAddressData from "../../../../services/routes/screens/resources/postAddressData";
import formatNumber from "../../../../utils/formatNumber";
import getValidationErrors from "../../../../utils/getValidationErrors";
import { CollapseWithTwoItems } from "../../styles";

interface IAddressProps {
  userData: {
    codPes: string;
    idEndereco: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    idCidade: string;
    idEstado: string;
    cep: string;
    pais: string;
    idTipoEndereco: number;
  };
  canEditForm: boolean;
  setCanEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  UFList: TUF[] | undefined;
}

type TFormData = {
  address: string;
  neighborhood: string;
  cep: string;
  country: string;
  idcidade: string;
  idestado: string;
};

export default function Address({
  userData,
  canEditForm,
  setCanEditForm,
  UFList,
}: IAddressProps) {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { theme } = useTheme();

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = useCallback(
    async (formData: TFormData) => {
      formRef.current?.setErrors({});

      if (
        formData.address === userData.logradouro &&
        formData.neighborhood === userData.bairro &&
        formData.idestado === userData.idEstado &&
        formData.idcidade === userData.idCidade &&
        formData.cep === userData.cep
      ) {
        setCanEditForm(false);

        return;
      }

      const schema = Yup.object().shape({
        address: Yup.string(),
        neighborhood: Yup.string(),
        cep: Yup.string().matches(/^\d{5}-?\d{3}$/, "CEP inválido"),
        idestado: Yup.string().notOneOf(["0"], "UF inválido"),
        idcidade: Yup.string().notOneOf(["0"], "Cidade inválida"),
      });

      try {
        await schema.validate(formData, {
          abortEarly: false,
        });

        setIsSending(true);

        await postAddressData({
          codPes: user.codPes,
          addressData: {
            logradouro: formData.address,
            bairro: formData.neighborhood,
            idcidade: Number(formData.idcidade),
            cep: formatNumber({ data: formData.cep, type: "cep" }),
            idestado: Number(formData.idestado),
            idpais: 34,
            idtipoendereco: userData.idTipoEndereco,
          },
        });

        setIsSending(false);

        Toast({
          message: "Dados enviados com sucesso",
          description: "Seus dados foram enviados e salvos no sistema",
          type: "success",
          duration: 5000,
          icon: "success",
        });

        setCanEditForm(false);
      } catch (error: any) {
        setIsSending(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          Toast({
            message: "Erro ao salvar informações",
            description: "Por favor verifique os seus dados",
            type: "danger",
            duration: 5000,
            icon: "danger",
          });

          return;
        }

        Toast({
          message: "Erro ao enviar as suas informações",
          description:
            "Por favor tente novamente. Caso persista, contate o suporte",
          type: "danger",
          duration: 8000,
          icon: "danger",
        });
      }
    },
    [
      setCanEditForm,
      user.codPes,
      userData.bairro,
      userData.cep,
      userData.idCidade,
      userData.idEstado,
      userData.idTipoEndereco,
      userData.logradouro,
    ],
  );

  const [cityList, setCityList] = useState<TCity[]>([]);

  const handleChangeUF = useCallback(async (ufId: string) => {
    const cityResponse = await getCityList({
      idUf: ufId,
    });

    setCityList(cityResponse);
  }, []);

  useEffect(() => {
    formRef.current?.setErrors({});
  }, [canEditForm]);
  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      {!canEditForm && (
        <View
          style={{
            opacity: -1,
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 9999,
          }}
        />
      )}

      {/* <KeyboardAvoidingView
        keyboardVerticalOffset={80}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
      <InputProfile
        label="Logradouro:"
        name="address"
        defaultValue={userData.logradouro}
        disabled={!canEditForm}
      />

      <InputProfile
        label="Bairro:"
        name="neighborhood"
        defaultValue={userData.bairro}
        containerStyle={{ marginRight: 8 }}
        disabled={!canEditForm}
      />

      <Select
        label="UF:"
        name="idestado"
        data={UFList?.map(uf => {
          return {
            label: uf.nome,
            value: uf.idUf,
            key: uf.idUf,
          };
        })}
        disabled={!canEditForm}
        handleChange={handleChangeUF}
        initialData={{
          label: userData.uf,
          value: userData.idEstado,
        }}
      />

      {Platform.OS === "ios" ? (
        <>
          <Select
            label="Cidade:"
            name="idcidade"
            data={
              cityList
                ? cityList.map(city => {
                    return {
                      label: city.nome,
                      value: city.idCidade,
                      key: city.idCidade,
                    };
                  })
                : null
            }
            disabled={!canEditForm}
            initialData={
              cityList.length > 0
                ? {
                    label: "Selecione uma cidade",
                    value: "0",
                  }
                : {
                    label: userData.cidade,
                    value: userData.idCidade,
                  }
            }
          />

          <InputProfileMask
            label="CEP:"
            name="cep"
            maskType="cep"
            defaultValue={userData.cep}
            disabled={!canEditForm}
            keyboardType="number-pad"
          />
        </>
      ) : (
        <CollapseWithTwoItems>
          <View style={{ width: "70%" }}>
            <Select
              label="Cidade:"
              name="idcidade"
              data={
                cityList
                  ? cityList.map(city => {
                      return {
                        label: city.nome,
                        value: city.idCidade,
                        key: city.idCidade,
                      };
                    })
                  : null
              }
              disabled={!canEditForm}
              initialData={
                cityList.length > 0
                  ? {
                      label: "Selecione uma cidade",
                      value: "0",
                    }
                  : {
                      label: userData.cidade,
                      value: userData.idCidade,
                    }
              }
            />
          </View>
          <View style={{ width: "30%" }}>
            <InputProfileMask
              label="CEP:"
              name="cep"
              maskType="cep"
              defaultValue={userData.cep}
              containerStyle={{ marginLeft: 8 }}
              disabled={!canEditForm}
              keyboardType="number-pad"
            />
          </View>
        </CollapseWithTwoItems>
      )}

      <InputProfile
        label="País:"
        name="country"
        value={userData.pais}
        disabled
      />

      {canEditForm && (
        <Button
          style={{
            marginBottom: 24,
            backgroundColor: theme.colors.secondary,
          }}
          onPress={() => {
            formRef.current?.submitForm();
          }}
          isLoading={isSending}
        >
          Salvar informações
        </Button>
      )}
      {/* </KeyboardAvoidingView> */}
    </Form>
  );
}
