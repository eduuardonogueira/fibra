"use client";

import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ICreateProfessional, IUser } from "@/types/users";

interface IProfessionalFormFooter {
  setIsEditing: (prop: boolean) => void;
  isSaving: boolean;
  setEditedProfessional: Dispatch<SetStateAction<ICreateProfessional | IUser>>;
  professional: ICreateProfessional | IUser;
}

export function ProfessionalFormFooter({
  isSaving,
  setIsEditing,
  setEditedProfessional,
  professional,
}: IProfessionalFormFooter) {
  return (
    <CardFooter className="flex justify-between mt-6">
      <Button
        variant="outline"
        type="button"
        className="hover:cursor-pointer"
        onClick={() => {
          setIsEditing(false);
          setEditedProfessional(professional);
        }}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        disabled={isSaving}
        className="hover:cursor-pointer"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </>
        )}
      </Button>
    </CardFooter>
  );
}
