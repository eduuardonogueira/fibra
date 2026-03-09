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
import { Card, CardTitle } from "@/components/ui/card";
import { myToast } from "@/components/index";
import { login } from "@/services/index";
import { DASHBOARD_ROUTE, FORGOT_ROUTE } from "@/constants/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <div>
      <Image
        src="/logo-background.webp"
        alt="Transladanção"
        width={1024}
        height={682}
        className="absolute -z-10 bg-cover h-full w-full"
      />
      <div className="container mx-auto flex w-full h-screen max-w-200 items-center px-4">
        <Card className="flex flex-col items-center w-full py-20">
          <div className="flex flex-col items-center justify-around gap-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="h-20 w-20"
            />
            <CardTitle className="text-3xl font-bold text-center">
              Bem-vindo! Ao <br /> Sistema da Guarda de Nazaré
            </CardTitle>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col items-center gap-4 w-full max-w-75"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input placeholder="joao.silva@gmail.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-red-400 text-white w-full hover:cursor-pointer hover:bg-red-500 font-bold text-1xl"
                disabled={isSubmiting}
              >
                {isSubmiting ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  "Entrar"
                )}
              </Button>
              <Link
                href={FORGOT_ROUTE}
                className="text-sm text-blue-500 underline hover:text-blue-800"
              >
                Esqueci minha senha
              </Link>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}

