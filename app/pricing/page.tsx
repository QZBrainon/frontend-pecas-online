import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/application/Header";
import convertCentsToBRL from "@/utils/convertCentsToBRL";
import { Plano } from "@/interfaces/Plano";

const PLANOS = {
  BASIC: 1,
  VIP: 2,
};

export default async function Pricing() {
  const planos = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/planos`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return (
    <section className="bg-background body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-4xl font-bold title-font mb-2 text-foreground mt-20">
            Planos
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-md text-muted-foreground">
            Escolha o plano perfeito para sua empresa. Atualize ou cancele a
            assinatura a qualquer momento.
          </p>
        </div>
        <div className="flex flex-wrap -m-4 justify-center">
          {/* Basic Plan */}
          <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-border flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-muted-foreground">
                Básico
              </h2>
              <h1 className="text-5xl text-foreground pb-4 mb-4 border-b border-border leading-none">
                {convertCentsToBRL(
                  planos.find((plano: Plano) => plano.id === PLANOS.BASIC)
                    ?.precoEmCentavos ?? ""
                )}
                <span className="text-lg ml-1 font-normal text-muted-foreground">
                  /mês
                </span>
              </h1>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Estoque
              </p>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Cotações
              </p>
              <Link className="flex items-center mt-auto" href="/signup">
                <Button className=" text-primary-foreground bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary/90 rounded">
                  Assinar plano básico
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
          {/* VIP Plan */}
          <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
              <span className="bg-primary text-primary-foreground px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                MAIS POPULAR
              </span>
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-muted-foreground">
                VIP
              </h2>
              <h1 className="text-5xl text-foreground leading-none flex items-center pb-4 mb-4 border-b border-border">
                <span>
                  {convertCentsToBRL(
                    planos.find((plano: Plano) => plano.id === PLANOS.VIP) ?.precoEmCentavos ?? ""
                  )}
                </span>
                <span className="text-lg ml-1 font-normal text-muted-foreground">
                  /mês
                </span>
              </h1>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Estoque
              </p>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Cotações
              </p>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Banner de destaque
              </p>
              <Link className="flex items-center mt-auto" href="/signup">
                <Button className="text-primary-foreground bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary/90 rounded">
                  Assinar plano VIP
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
          {/* VIP Plan */}
          {/* <div className="p-4 xl:w-1/3 md:w-1/2 w-full">
            <div className="h-full p-6 rounded-lg border-2 border-border flex flex-col relative overflow-hidden">
              <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-muted-foreground">
                VIP
              </h2>
              <h1 className="text-5xl text-foreground leading-none flex items-center pb-4 mb-4 border-b border-border">
                <span>R$1308,00</span>
                <span className="text-lg ml-1 font-normal text-muted-foreground">
                  /mês
                </span>
              </h1>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Estoque
              </p>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Cotações
              </p>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Banner de destaque
              </p>
              <p className="flex items-center text-foreground mb-2">
                <Check className="w-4 h-4 mr-2" />
                Banner grande
              </p>
              <Link className="flex items-center mt-auto" href="/signup">
                <Button className="justify-center mt-6 text-primary-foreground bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary/90 rounded">
                  Assinar plano VIP
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Button>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
