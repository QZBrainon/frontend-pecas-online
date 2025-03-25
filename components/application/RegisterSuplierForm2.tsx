"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { formatCNPJ } from "@/utils/formatCnpj";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Plano } from "@/interfaces/Plano";
import convertCentsToBRL from "@/utils/convertCentsToBRL";
import { STATES } from "@/utils/States";
import { formatCEP } from "@/utils/formatCep";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  formatPhoneNumber,
  formatWhatsappNumber,
} from "@/utils/formatPhoneNumber";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { convertStateToPayload } from "@/utils/convertStateToPayload";

const formSchema = z.object({
  empresa: z.string().nonempty("O nome da empresa é obrigatória"),
  razaoSocial: z.string().nonempty("A razão social da empresa é obrigatória"),
  cnpj: z
    .string()
    .min(18, "O CNPJ deve ter 18 caracteres.")
    .nonempty("O CNPJ é obrigatório"),
  endereco: z.string().nonempty("O endereço do fornecedor é obrigatório"),
  telefone: z.string().nonempty("O telefone do fornecedor é obrigatório"),
  whatsapp: z.string().nonempty("O whatsapp do fornecedor é obrigatório"),
  email: z
    .string()
    .email("O email deve ser válido.")
    .nonempty("O email é obrigatório"),
  idPlano: z.string().nonempty("O plano do fornecedor é obrigatório"),
  cidade: z.string().nonempty("A cidade do fornecedor é obrigatório"),
  estado: z.string().nonempty("O estado do fornecedor é obrigatório"),
  cep: z
    .string()
    .min(9, "O CEP deve ter 9 caracteres.")
    .nonempty("O CEP é obrigatório"),
  bairro: z.string().nonempty("O bairro do fornecedor é obrigatório"),
  vendedores: z.string().nonempty("O nome dos vendedores é obrigatório"),
  website: z.string().url("O website precisa ser uma URL válida").optional(),
});

export default function RegisterSuplierForm2() {
  const [planos, setPlanos] = useState<Plano[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      empresa: "",
      razaoSocial: "",
      cnpj: "",
      endereco: "",
      telefone: "",
      whatsapp: "",
      email: "",
      idPlano: "",
      cidade: "",
      estado: "",
      cep: "",
      bairro: "",
      vendedores: "",
      website: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/planos");
      const result = await res.json();
      setPlanos(result);
    };

    fetchData();
  }, []);

  const selectedPlan = planos.find(
    (plano) => plano.id === Number(form.watch("idPlano"))
  );

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submission triggered");
    console.log(form.formState.errors);

    const payload = convertStateToPayload(data);
    const response = await fetch(`/api/fornecedores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 201) {
      router.push("/thanks");
    } else if (response.status === 400) {
      toast({
        title: "Erro ao cadastrar fornecedor.",
        description: "CNPJ já cadastrado.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erro ao cadastrar fornecedor.",
        description: "Erro ao cadastrar fornecedor.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-3xl font-bold max-w-2xl mx-auto p-6">
        Se você quer anunciar seu estoque, se inscreva abaixo e selecione seu
        plano desejado.
      </h2>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto p-6 rounded-lg shadow grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="empresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Empresa" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="razaoSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razão Social</FormLabel>
              <FormControl>
                <Input placeholder="Razão Social" {...field} />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.razaoSocial?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input
                  placeholder="xx.xxx.xxx/xxxx-xx"
                  {...field}
                  onChange={(e) => field.onChange(formatCNPJ(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.cnpj?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idPlano"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Plano</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    {planos &&
                      planos.map((plano) => (
                        <SelectItem key={plano.id} value={plano.id.toString()}>
                          {plano.nome}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.idPlano?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Preço</FormLabel>
          <Input
            id="preco"
            className="text-muted-foreground col-span-1 "
            placeholder="Preço"
            readOnly
            value={convertCentsToBRL(selectedPlan?.precoEmCentavos ?? "")}
          />
        </FormItem>

        <h2 className="text-3xl font-bold mt-4 col-span-2">Endereço</h2>

        <FormField
          control={form.control}
          name="endereco"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Endereço completo" {...field} />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.endereco?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Cidade" {...field} />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.cidade?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATES.map((state) => (
                      <SelectItem
                        key={state.id}
                        id={state.id.toString()}
                        value={state.id.toString()}
                      >
                        {state.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.estado?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>C.E.P</FormLabel>
              <FormControl>
                <Input
                  placeholder="xxxxx-xxx"
                  {...field}
                  onChange={(e) => field.onChange(formatCEP(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.cep?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bairro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder="Bairro" {...field} />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.bairro?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <h2 className="text-3xl font-bold mt-4 col-span-2">Contato</h2>

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(xx) xxxxx-xxxx"
                  {...field}
                  onChange={(e) =>
                    field.onChange(formatPhoneNumber(e.target.value))
                  }
                  maxLength={11}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.telefone?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp</FormLabel>
              <FormControl>
                <Input
                  placeholder="(xx) xxxxx-xxxx"
                  {...field}
                  onChange={(e) =>
                    field.onChange(formatWhatsappNumber(e.target.value))
                  }
                  maxLength={12}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.whatsapp?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.email?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <h2 className="text-3xl font-bold mt-4 col-span-2">
          Informações Adicionais
        </h2>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>WebSite</FormLabel>
              <FormControl>
                <Input placeholder="https://www.exemplo.com" {...field} />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.website?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vendedores"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Nome dos vendedores de peças</FormLabel>
              <FormControl>
                <Textarea placeholder="Leandro, Vanessa, Rafael" {...field} />
              </FormControl>
              <FormMessage className="text-red-500">
                {form.formState.errors.vendedores?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full col-span-2 mt-4">
          Enviar Formulário
        </Button>
      </form>
    </Form>
  );
}
