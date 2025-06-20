"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Filter } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getProfessionalsAndServices } from "@/hooks/useProfessionals";
import { myToast } from "@/components/myToast";
import { IUserWithServices } from "@/types/users";

interface IPageHeaderProps {
  weekStart: Date;
  weekEnd: Date;
  selectedProfessional: string;
  setSelectedProfessional: Dispatch<SetStateAction<string>>;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

export default function PageHeader({
  weekStart,
  weekEnd,
  selectedProfessional,
  setSelectedProfessional,
  pagination,
}: IPageHeaderProps) {
  const [professionals, setProfessionals] = useState<
    IUserWithServices[] | null
  >([]);

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        const response = await getProfessionalsAndServices(pagination);
        if (!response) {
          myToast("Erro", "Falha ao carregar profissionais");
          return;
        }

        const { data } = response;
        setProfessionals(data);
      } catch (error) {
        myToast("Erro", "Falha ao carregar profissionais");
        console.log(error);
      }
    }

    fetchProfessionals();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Calendário Semanal</h1>
        <p className="text-muted-foreground">
          {format(weekStart, "dd 'de' MMMM", { locale: ptBR })} -{" "}
          {format(weekEnd, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Select
          value={selectedProfessional}
          onValueChange={setSelectedProfessional}
        >
          <SelectTrigger className="w-min-[200px] hover:cursor-pointer">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Selecione o profissional" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="all" className="hover:cursor-pointer">
              Todos
            </SelectItem>
            {professionals && professionals.length > 0
              ? professionals.map((professional) => (
                  <SelectItem
                    key={professional.id}
                    value={professional.id}
                    className="hover:cursor-pointer"
                  >
                    {professional.fullName}
                  </SelectItem>
                ))
              : ""}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
