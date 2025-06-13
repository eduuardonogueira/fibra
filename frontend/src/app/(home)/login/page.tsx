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
import { login } from "@/hooks/useApi";
import { DASHBOARD_ROUTER } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { myToast } from "@/components/myToast";

const formSchema = z.object({
  username: z.string().email({ message: "O email deve ser um email válido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve conter pelo menos 8 caracteres" }),
});

export default function Login() {
  const router = useRouter();
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
    const isLogged = await login(username, password);

    if (isLogged) {
      myToast("Sucesso", "Login realizado com sucesso!");
      router.push(DASHBOARD_ROUTER);
      return;
    }

    myToast("Erro ao fazer login", "Usuário ou senha inválidos!");
  }

  return (
    <div className="container mx-auto flex w-full h-screen max-w-[800px] items-center ">
      <Card className="flex flex-col items-center w-full py-20">
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
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
              className="bg-yellow-400 text-black w-full hover:cursor-pointer hover:bg-yellow-500"
            >
              Login
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
