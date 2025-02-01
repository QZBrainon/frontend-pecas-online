"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://novopeasonlinebackend-lnq16zyw.b4a.run/v1/api/contact-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        toast({
          title: "Ocorreu um erro ao enviar a mensagem!",
          description: "Por favor, tente novamente mais tarde.",
          variant: "destructive",
        });
        resetForm();
        setIsSubmitting(false);
        return;
      }
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Obrigado por entrar em contato!",
        variant: "success",
      });
      resetForm();
      setIsSubmitting(false);
    } catch (error) {
      console.error("Ocorreu um erro ao enviar a mensagem:", error);
      toast({
        title: "Ocorreu um erro ao enviar a mensagem!",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
      resetForm();
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-background body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
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
          <form className="flex flex-wrap -m-2" onSubmit={handleSubmit}>
            <div className="p-2 w-1/2">
              <Input
                name="name"
                type="text"
                placeholder="Nome"
                className="w-full bg-muted"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="p-2 w-1/2">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full bg-muted"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="p-2 w-full">
              <Input
                name="subject"
                type="text"
                placeholder="Assunto"
                className="w-full bg-muted"
                onChange={handleChange}
                value={formData.subject}
              />
            </div>
            <div className="p-2 w-full">
              <Textarea
                name="message"
                placeholder="Mensagem"
                className="w-full bg-muted h-32"
                onChange={handleChange}
                value={formData.message}
              />
            </div>
            <div className="p-2 w-full">
              <Button className="flex mx-auto text-primary-foreground bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-primary/90 rounded text-lg">
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
