"use client";

import { myToast } from "@/components/myToast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IRegisterCustomerForm } from "@/types/registerCustomerForm";
import { IViaCepResponse } from "@/types/viaCep";
import { useEffect, useState } from "react";

type IAddressInputs = IRegisterCustomerForm;

export default function AddressInputs({ form }: IAddressInputs) {
  const [cep, setCep] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  useEffect(() => {
    const baseUrl = "https://viacep.com.br/ws/";

    async function fetchCEP() {
      const url = new URL(`${cep}/json/`, baseUrl);
      try {
        const response = await fetch(url, {
          method: "GET",
        });

        if (!response.ok) {
          myToast("Erro", "erro ao consultar CEP inserido");
        }

        const data: IViaCepResponse = await response.json();

        if (data.erro)
          myToast("CEP Inválido!", "erro ao consultar CEP inserido");
        console.log(data);
        const { logradouro, bairro, localidade, uf, } = data;
        const fullAddress = `${logradouro}, ${bairro},  ${
          houseNumber ? `número ${houseNumber}` : ""
        }, ${localidade}, ${uf}.`;
        form.setValue("address", fullAddress);
        return;
      } catch (error) {
        console.log(error);
      }
    }

    fetchCEP();
  }, [cep.length >= 8, houseNumber]);

  function handleCEPChange(value: string) {
    setCep(value);
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Endereço</h3>
      <Label className="flex flex-col gap-2 items-start w-full">
        CEP:
        <Input
          placeholder="Digite seu CEP"
          onChange={(e) => handleCEPChange(e.target.value)}
          required
        />
      </Label>

      <Label className="flex flex-col gap-2 items-start w-full">
        Número:
        <Input
          placeholder="Digite número do local"
          onChange={(e) => setHouseNumber(e.target.value)}
          type="number"
          required
        />
      </Label>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Endereço completo:</FormLabel>
            <FormControl>
              <Textarea placeholder="Digite seu endereço completo" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
