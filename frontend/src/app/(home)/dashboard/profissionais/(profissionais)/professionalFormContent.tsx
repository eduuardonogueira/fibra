import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ICreateProfessional, IUser, UserRoles } from "@/types/users";

interface IProfessionalFormContent {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleRoleChange: (value: UserRoles) => void;
  editedProfessional: IUser | ICreateProfessional;
  professionalRoles: string[];
}

export function ProfessionalFormContent({
  handleInputChange,
  editedProfessional,
  professionalRoles,
  handleRoleChange,
}: IProfessionalFormContent) {
  return (
    <CardContent className="space-y-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input
            id="fullName"
            name="fullName"
            value={editedProfessional.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={editedProfessional.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {"password" in editedProfessional && (
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="text"
              value={editedProfessional.password}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Tipo de Cliente</Label>
          <RadioGroup
            value={editedProfessional.role}
            onValueChange={handleRoleChange}
            className="flex flex-col space-y-1"
          >
            {professionalRoles.map((role) => (
              <div key={role} className="flex items-center space-x-2 ">
                <RadioGroupItem
                  value={role}
                  id={role}
                  className="hover:cursor-pointer "
                />
                <Label htmlFor={role} className="font-normal capitalize">
                  {role}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </CardContent>
  );
}
