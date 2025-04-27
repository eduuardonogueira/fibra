import { ICustomerAndAppointments } from "@/types/customers";

export const usersMock: ICustomerAndAppointments[] = [
  {
    id: "1",
    fullName: "John Doe",
    phone: "(+55) 98765-4321",
    age: 35,
    address: "Rua das Flores, 123, São Paulo, SP",
    photoUrl: "/placeholder.svg?height=200&width=200",
    customerType: "adulto",
    appointmentsId: ["1", "7", "11"],
  },
  {
    id: "2",
    fullName: "Jane Smith",
    phone: "(+55) 91234-5678",
    age: 28,
    address: "Avenida Paulista, 1000, São Paulo, SP",
    photoUrl: "/placeholder.svg?height=200&width=200",
    customerType: "mirim",
    appointmentsId: ["2"],
  },
  {
    id: "3",
    fullName: "Robert Johnson",
    phone: "(+55) 99876-5432",
    age: 42,
    address: "Rua Augusta, 500, São Paulo, SP",
    photoUrl: "/placeholder.svg?height=200&width=200",
    customerType: "familiar",
    appointmentsId: ["3"],
  },
  {
    id: "4",
    fullName: "Emily Davis",
    phone: "(+55) 97654-3210",
    age: 31,
    address: "Rua Oscar Freire, 300, São Paulo, SP",
    photoUrl: "/placeholder.svg?height=200&width=200",
    customerType: "adulto",
    appointmentsId: ["4"],
  },
];
