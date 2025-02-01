"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z
    .string()
    .max(50, "Limite de 50 caracteres")
    .trim()
    .nonempty("O nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .max(50, "Limite de 50 caracteres")
    .trim()
    .nonempty("O email é obrigatório"),
  subject: z
    .string()
    .max(50, "Limite de 50 caracteres")
    .trim()
    .nonempty("O assunto é obrigatório"),
  message: z
    .string()
    .max(500, "Limite de 500 caracteres")
    .trim()
    .nonempty("A mensagem é obrigatória"),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const response = await fetch(
      "https://novopeasonlinebackend-lnq16zyw.b4a.run/v1/api/contact-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      toast({
        title: "Ocorreu um erro ao enviar a mensagem!",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Obrigado por entrar em contato!",
      variant: "success",
    });
    form.reset();
    setIsSubmitting(false);
  }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   try {
  //     const response = await fetch(
  //       "https://novopeasonlinebackend-lnq16zyw.b4a.run/v1/api/contact-form",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           accept: "*/*",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );
  //     if (!response.ok) {
  //       toast({
  //         title: "Ocorreu um erro ao enviar a mensagem!",
  //         description: "Por favor, tente novamente mais tarde.",
  //         variant: "destructive",
  //       });
  //       resetForm();
  //       setIsSubmitting(false);
  //       return;
  //     }
  //     toast({
  //       title: "Mensagem enviada com sucesso!",
  //       description: "Obrigado por entrar em contato!",
  //       variant: "success",
  //     });
  //     resetForm();
  //     setIsSubmitting(false);
  //   } catch (error) {
  //     console.error("Ocorreu um erro ao enviar a mensagem:", error);
  //     toast({
  //       title: "Ocorreu um erro ao enviar a mensagem!",
  //       description: "Por favor, tente novamente mais tarde.",
  //       variant: "destructive",
  //     });
  //     resetForm();
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <section className="bg-background body-font overflow-hidden">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-bold title-font mb-2 text-foreground mt-20">
            Entre em Contato
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-md text-muted-foreground">
            Estamos aqui para ajudar. Preencha o formulário abaixo e entraremos
            em contato o mais breve possível.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap -m-2"
            >
              <div className="p-2 w-1/2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nome"
                          {...field}
                          className="w-full bg-muted"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="p-2 w-1/2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="w-full bg-muted"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 h-4" />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="p-2 w-full">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Assunto"
                          {...field}
                          className="w-full bg-muted"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 h-4" />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="p-2 w-full">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Mensagem"
                          {...field}
                          className="w-full bg-muted h-32"
                          maxLength={500}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 h-4" />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="p-2 w-full">
                <Button
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center mx-auto text-primary-foreground bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-primary/90 rounded text-center text-lg"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
