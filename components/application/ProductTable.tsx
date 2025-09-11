"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Phone } from "lucide-react";

export interface Product {
  id: number;
  quantidade: number;
  fornecedor: {
    razaoSocial: string;
    contato: {
      whatsapp: string;
      telefone: string;
    };
    endereco: {
      estado: {
        sigla: string;
      };
    };
  };
  peca: {
    codigo: string;
    descricao: string;
    precoEmCentavos: number | null;
    categoria: {
      nome: string;
    };
  };
}

interface ProductTableProps {
  products: Product[];
}

function truncateDescription(
  description: string,
  wordLimit: number = 5
): string {
  const words = description.trim().split(/\s+/);
  if (words.length <= wordLimit) {
    return description;
  }
  return `${words.slice(0, wordLimit).join(" ")}...`;
}

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, ""); // Remove non-numeric characters
  if (cleaned.length === 10) {
    // Format as (XX) XXXX-XXXX for landline
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
      6
    )}`;
  } else if (cleaned.length === 11) {
    // Format as (XX) XXXXX-XXXX for mobile
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7
    )}`;
  }
  return phone; // Return original if format is unexpected
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">Catálogo de Peças</h2>
      {products?.length > 0 ? (
        <TooltipProvider>
          <div className="overflow-x-auto">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs lg:text-sm w-[80px]">
                    Código
                  </TableHead>
                  <TableHead className="text-xs lg:text-sm w-[120px]">
                    Nome
                  </TableHead>
                  <TableHead className="text-xs lg:text-sm w-[90px]">
                    Preço
                  </TableHead>
                  <TableHead className="text-xs lg:text-sm w-[150px]">
                    Fornecedor
                  </TableHead>
                  <TableHead className="text-xs lg:text-sm text-center w-[80px]">
                    Quantidade
                  </TableHead>
                  <TableHead className="text-xs lg:text-sm text-center w-[60px]">
                    Estado
                  </TableHead>
                  <TableHead className="text-xs lg:text-sm w-[120px]">
                    Contato
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: Product, index: number) => (
                  <TableRow
                    key={product.id}
                    className={index % 2 === 0 ? "bg-background" : "bg-muted"}
                  >
                    <TableCell className="text-xs lg:text-sm truncate">
                      {product.peca.codigo}
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="truncate cursor-pointer">
                            {truncateDescription(product.peca.descricao, 2)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>{product.peca.descricao}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm truncate">
                      {product.peca.precoEmCentavos
                        ? new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.peca.precoEmCentavos / 100)
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="truncate cursor-pointer">
                            {product.fornecedor.razaoSocial}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-sm">
                          <p>{product.fornecedor.razaoSocial}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm text-center truncate">
                      {product.quantidade}
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm text-center truncate">
                      {product.fornecedor.endereco.estado.sigla}
                    </TableCell>
                    <TableCell className="text-xs lg:text-sm tabular-nums">
                      <div className="flex items-center truncate">
                        <span className="truncate">
                          {formatPhoneNumber(
                            product.fornecedor.contato.whatsapp
                          ) ||
                            formatPhoneNumber(
                              product.fornecedor.contato.telefone
                            )}
                        </span>
                        <a
                          href={`tel:${product.fornecedor.contato.whatsapp.replace(
                            /\D/g,
                            ""
                          )}`}
                          className="ml-2 sm:hidden flex-shrink-0"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Contact supplier via WhatsApp"
                        >
                          <Phone className="h-4 w-4 text-emerald-500" />
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TooltipProvider>
      ) : (
        <p className="sm:text-center text-foreground">
          Pesquise pelo código da peça acima
        </p>
      )}
    </div>
  );
}
