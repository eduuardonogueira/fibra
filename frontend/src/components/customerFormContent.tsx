import { Camera, User } from "lucide-react";
import { CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { CustomerType, ICustomerAndAppointments } from "@/types/customers";
import Image from "next/image";
import { ICustomerType } from "@/types/customerTypes";

interface ICustomerFormContent {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCustomerTypeChange: (value: CustomerType) => void;
  user?: ICustomerAndAppointments;
  editedUser: ICustomerAndAppointments;
  customerTypes: ICustomerType[] | null;
}

export function CustomerFormContent({
  handleInputChange,
  handleCustomerTypeChange,
  user,
  editedUser,
  customerTypes,
}: ICustomerFormContent) {
  return (
    <CardContent className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {user && user.photoUrl ? (
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
            className="absolute bottom-0 right-0 rounded-full h-10 w-10 hover:cursor-pointer"
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
          {customerTypes ? (
            <>
              <Label>Tipo de Cliente</Label>
              <RadioGroup
                value={editedUser.customerType}
                onValueChange={handleCustomerTypeChange}
                className="flex flex-col space-y-1"
              >
                {customerTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2 ">
                    <RadioGroupItem
                      value={type.name}
                      id={type.id}
                      className="hover:cursor-pointer "
                    />
                    <Label htmlFor={type.id} className="font-normal capitalize">
                      {type.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <p>Erro ao carregar tipos</p>
          )}
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
  );
}
