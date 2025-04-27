/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import { Camera, User } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { usersMock } from "./mock";

import Loading from "./loading";
import { FormFooter } from "./formFooter";
import { FormHeader } from "./formHeader";
import { NotFoundCustomer } from "./notFoundCustomer";

import { CustomerType, ICustomerAndAppointments } from "@/types/customers";

const users = usersMock;

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: userId } = use(params);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<ICustomerAndAppointments | null>(null);
  const [editedUser, setEditedUser] = useState<ICustomerAndAppointments | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundUser = users.find((u) => u.id === userId);

        if (foundUser) {
          setEditedUser(foundUser);
          setUser(foundUser);
        } else {
          toast("Erro", {
            description: "Usuário não encontrado",
          });
        }
      } catch (error) {
        toast("Error", {
          description: "Falha ao carregar dados do usuário",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("Sucesso", {
        description: "Informações do usuário atualizadas com sucesso",
      });
    } catch (error) {
      toast("Error", {
        description: "Falha ao atualizar informações do usuário",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIsEditing(true);
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleCustomerTypeChange = (value: CustomerType) => {
    setIsEditing(true);
    setEditedUser((prev) => (prev ? { ...prev, customerType: value } : null));
  };

  if (isLoading) return <Loading />;

  if (!user || !editedUser) return <NotFoundCustomer />;

  return (
    <div className="container mx-auto">
      <Card>
        <FormHeader />
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {user.photoUrl ? (
                  <Image
                    src={user.photoUrl || "/placeholder.svg"}
                    alt="Foto do perfil"
                    width={150}
                    height={150}
                    className="rounded-full object-cover border-4 border-background"
                  />
                ) : (
                  <div className="w-[150px] h-[150px] rounded-full bg-muted flex items-center justify-center">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <Button
                  type="button"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Alterar foto</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Clique no ícone para alterar a foto
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={editedUser.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="120"
                  value={editedUser.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Cliente</Label>
                <RadioGroup
                  value={editedUser.customerType}
                  onValueChange={handleCustomerTypeChange}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adulto" id="adulto" />
                    <Label htmlFor="adulto" className="font-normal">
                      Adulto
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mirim" id="mirim" />
                    <Label htmlFor="mirim" className="font-normal">
                      Mirim
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="familiar" id="familiar" />
                    <Label htmlFor="familiar" className="font-normal">
                      Familiar
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={editedUser.address}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
            </div>
          </CardContent>
        </form>
        {isEditing && (
          <FormFooter
            isSaving={isSaving}
            user={user}
            setIsEditing={setIsEditing}
            setEditedUser={setEditedUser}
          />
        )}
      </Card>
    </div>
  );
}
