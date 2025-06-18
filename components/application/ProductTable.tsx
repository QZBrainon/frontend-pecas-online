"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
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
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Código</TableHead>
              <TableHead className="text-xs sm:text-sm">Nome</TableHead>
              <TableHead className="text-xs sm:text-sm">Categoria</TableHead>
              <TableHead className="text-xs sm:text-sm">Preço</TableHead>
              <TableHead className="text-xs sm:text-sm">Fornecedor</TableHead>
              <TableHead className="text-xs sm:text-sm">Quantidade</TableHead>
              <TableHead className="text-xs sm:text-sm">Estado</TableHead>
              <TableHead className="text-xs sm:text-sm">Contato</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: Product, index: number) => (
              <TableRow
                key={product.id}
                className={index % 2 === 0 ? "bg-background" : "bg-muted/80"}
              >
                <TableCell className="text-xs sm:text-sm">
                  {product.peca.codigo}
                </TableCell>
                <TableCell className="text-xs sm:text-sm text-nowrap">
                  {product.peca.descricao}
                </TableCell>
                <TableCell className="text-xs sm:text-sm">
                  {product.peca.categoria?.nome?.trim()
                    ? product.peca.categoria.nome
                    : "Genérica"}
                </TableCell>
                <TableCell className="text-xs sm:text-sm text-nowrap">
                  {product.peca.precoEmCentavos
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.peca.precoEmCentavos / 100)
                    : "Não informado"}
                </TableCell>
                <TableCell className="text-xs sm:text-sm text-nowrap">
                  {product.fornecedor.razaoSocial}
                </TableCell>
                <TableCell className="text-xs sm:text-sm text-center text-nowrap">
                  {product.quantidade}
                </TableCell>
                <TableCell className="text-xs sm:text-sm text-center text-nowrap">
                  {product.fornecedor.endereco.estado.sigla}
                </TableCell>
                <TableCell className="text-xs sm:text-sm text-nowrap tabular-nums">
                  <div className="flex items-center">
                    {formatPhoneNumber(product.fornecedor.contato.whatsapp) ||
                      formatPhoneNumber(product.fornecedor.contato.telefone)}
                    <a
                      href={`tel:${product.fornecedor.contato.whatsapp.replace(
                        /\D/g,
                        ""
                      )}`}
                      className="ml-2 sm:hidden"
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
      ) : (
        <p className="sm:text-center text-foreground">
          Pesquise pelo código da peça acima
        </p>
      )}
    </div>
  );
}

// function PaginationControls({
//   currentPage,
//   totalPages,
// }: {
//   currentPage: number;
//   totalPages: number;
// }) {
//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious href={`/products?page=${currentPage - 1}`} />
//         </PaginationItem>
//         {[...Array(Math.min(5, totalPages))].map((_, i) => (
//           <PaginationItem key={i}>
//             <PaginationLink
//               href={`/products?page=${i + 1}`}
//               isActive={currentPage === i + 1}
//             >
//               {i + 1}
//             </PaginationLink>
//           </PaginationItem>
//         ))}
//         {totalPages > 5 && <PaginationEllipsis />}
//         <PaginationItem>
//           <PaginationNext href={`/products?page=${currentPage + 1}`} />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }

// export default async function ProductsPage({
//   searchParams,
// }: {
//   searchParams: { page?: string };
// }) {
//   const page = Number(searchParams.page) || 1;
//   const { content: products, totalPages, number } = await getProducts(page);

//   return (
//     <div className="container mx-auto py-10">
//       <h1 className="text-2xl font-bold mb-5">Products</h1>
//       <Suspense fallback={<div>Loading...</div>}>
//         <ProductTable products={products} />
//       </Suspense>
//       {/* <div className="mt-5">
//         <PaginationControls currentPage={number + 1} totalPages={totalPages} />
//       </div> */}
//     </div>
//   );
// }
