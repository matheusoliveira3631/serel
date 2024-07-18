import { useCallback, useRef } from "react";
import { View } from "react-native";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import * as Yup from "yup";

import Button from "../../../../components/form/Button";
import InputProfile from "../../../../components/form/InputProfile";
import { useTheme } from "../../../../hooks/theme";
import { TRegistrationData } from "../../../../services/routes/screens/resources/resources";
import formatNumber from "../../../../utils/formatNumber";
import getValidationErrors from "../../../../utils/getValidationErrors";

type FormDataType = {
  birth: string;
  birth_2: string;
  categories: string;
  code: string;
  companyWork: string;
  completedName: string;
  cpf: string;
  fiscalObligationInOtherCountries: string;
  issuingBody: string;
  issuingDate: string;
  linkedInstitution: string;
  maritalStatus: string;
  monthlyGrossIncome: string;
  nationality: string;
  natureOfDocuments: string;
  numberOfDocuments: string;
  origin: string;
  politicallyExposed: string;
  representative: string;
};

interface IPersonalDataProps {
  userData: TRegistrationData;
  canEditForm: boolean;
}

export default function PersonalData({
  userData,
  canEditForm,
}: IPersonalDataProps) {
  const { theme } = useTheme();
  const formRef = useRef<FormHandles>(null);

  const [year, month, day] = new Date(userData.dtNasc)
    .toISOString()
    .split("T")[0]
    .split("-");

  const birth = `${day}/${month}/${year}`;

  const personalData = [
    {
      label: "Nascimento",
      text: birth,
      name: "birth",
    },
    {
      label: "CPF",
      text: formatNumber({ data: userData.cpf, type: "cpf" }),
      name: "cpf-register",
    },
    {
      label: "Estado civil",
      text: userData.estCivil,
      name: "maritalStatus",
    },
    {
      label: "Renda Bruta Mensal",
      text: userData.renBrutaMens,
      name: "monthlyGrossIncome",
    },
    {
      label: "Nacionalidade",
      text: userData.nacionalidade,
      name: "nationality",
    },
    {
      label: "Natureza do Documento",
      text: userData.natDocumento,
      name: "natureOfDocuments",
    },
    {
      label: "Número do Documento",
      text: userData.numDocumento,
      name: "numberOfDocuments",
    },
    {
      label: "Órgão Emissor",
      text: userData.orgaoEmissor,
      name: "issuingBody",
    },
    {
      label: "Data Emissão",
      text: userData.dtEmissao,
      name: "issuingDate",
    },
    {
      label: "Código",
      text: userData.codigo,
      name: "code",
    },
    {
      label: "Empresa em que trabalha",
      text: userData.empresa,
      name: "companyWork",
    },
    {
      label: "Instituição Vinculada",
      text: userData.instVinc,
      name: "linkedInstitution",
    },
    {
      label: "Origem",
      text: userData.origem,
      name: "origin",
    },
    {
      label: "Representante",
      text: userData.representante,
      name: "representative",
    },
    {
      label: "Categorias",
      text: userData.categoria,
      name: "categories",
    },
  ];

  const handleSubmit = useCallback(async (formData: FormDataType) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      birth: Yup.string(),
      birth_2: Yup.string(),
      categories: Yup.string(),
      code: Yup.string(),
      companyWork: Yup.string(),
      completedName: Yup.string(),
      cpf: Yup.string(),
      fiscalObligationInOtherCountries: Yup.string(),
      issuingBody: Yup.string(),
      issuingDate: Yup.string(),
      linkedInstitution: Yup.string(),
      maritalStatus: Yup.string(),
      monthlyGrossIncome: Yup.string(),
      nationality: Yup.string(),
      natureOfDocuments: Yup.string(),
      numberOfDocuments: Yup.string(),
      origin: Yup.string(),
      politicallyExposed: Yup.string(),
      representative: Yup.string(),
    });

    try {
      const validatedSchema = await schema.validate(formData, {
        abortEarly: false,
      });
    } catch (error: any) {
      formRef.current?.setErrors(getValidationErrors(error));
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <InputProfile
        label="Nome Completo:"
        name="completedName"
        value={userData.nome}
        disabled={!canEditForm}
      />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {personalData.map((item, index) => (
          <View
            style={{
              width: "50%",
            }}
            key={Math.random()}
          >
            <InputProfile
              label={item.label}
              name={item.name}
              value={item.text || "-"}
              containerStyle={
                index % 2 === 1 ? { marginLeft: 8 } : { marginRight: 8 }
              }
              disabled={!canEditForm}
            />
          </View>
        ))}
      </View>

      <InputProfile
        label="Pessoal Politicamente Exposta (PPE):"
        name="ppe"
        value={userData.ppe === "N" ? "Não" : "Sim"}
        disabled={!canEditForm}
      />

      <InputProfile
        label="Você tem obrigações fiscais com outros países?"
        name="obrigExt"
        value={userData.obrigExt}
        disabled={!canEditForm}
      />

      {canEditForm && (
        <Button
          style={{ marginBottom: 24, backgroundColor: theme.colors.secondary }}
          onPress={() => {
            formRef.current?.submitForm();
          }}
        >
          Salvar informações
        </Button>
      )}
    </Form>
  );
}
