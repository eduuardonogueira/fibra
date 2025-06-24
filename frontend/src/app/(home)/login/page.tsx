"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardTitle } from "@/components/ui/card";
import { login } from "@/hooks/useAuth";
import { DASHBOARD_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { myToast } from "@/components/myToast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  username: z.string().email({ message: "O email deve ser um email válido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve conter pelo menos 8 caracteres" }),
});

export default function Login() {
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSubmit({
    username,
    password,
  }: z.infer<typeof formSchema>) {
    setIsSubmiting(true);

    const isLogged = await login(username, password);

    if (isLogged) {
      myToast("Sucesso", "Login realizado com sucesso!");
      router.push(DASHBOARD_ROUTE);
      return;
    }

    myToast("Erro ao fazer login", "Usuário ou senha inválidos!");
    setIsSubmiting(false);
  }

  return (
    <div className="container mx-auto flex w-full h-screen max-w-[800px] items-center px-4">
      <Card className="flex flex-col items-center w-full py-20">
        <div className="flex flex-col items-center justify-around gap-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="h-20 w-20"
          />
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col items-center gap-4 w-full max-w-[300px]"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-red-400 text-white w-full hover:cursor-pointer hover:bg-red-500"
              disabled={isSubmiting}
            >
              {isSubmiting ? (
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              ) : (
                "login"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
