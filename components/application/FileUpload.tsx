"use client";
import { SVGProps, useEffect, useState } from "react"; // Import useState for managing file state
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FileUpload() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [token, setToken] = useState<string | null>("");

  const [isTokenVerified, setIsTokenVerified] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      console.log("Token retrieved from localStorage:", storedToken);
    }
  }, []);

  const allowedTypes = ["text/tab-separated-values", "text/plain"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    validateFile(file);
    setFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    validateFile(file);
    setFile(file);
  };

  const validateFile = (file: File | undefined) => {
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setError("Por favor, faça o upload de um arquivo válido: tsv ou txt.");

        return;
      }

      if (file.size > 25 * 1024 * 1024) {
        setError("O arquivo deve ser menor que 25 MB.");
        return;
      }

      setError(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const verifyToken = async (token: string | null) => {
    if (!token) {
      setError("Token não encontrado.");
      return;
    }
    try {
      const response = await fetch(
        `https://novopeasonlinebackend-lnq16zyw.b4a.run/api/v1/login/verify?token=${token}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        }
      );

      if (response.status === 200) {
        setIsTokenVerified(true);
        setError(null);
      } else {
        setError("Token inválido ou expirado.");
        setIsTokenVerified(false);
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      setError("Erro não esperado. Por favor, tente novamente mais tarde.");
      console.log("Token verification failed:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    await verifyToken(token);
    console.log("isTokenVerified", isTokenVerified);

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const url = `https://novopeasonlinebackend-lnq16zyw.b4a.run/api/v1/estoque?token=${token}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          "Erro ao subir o arquivo. Por favor, tente novamente mais tarde."
        );
      }
      setError(null);
      setFile(undefined);
      setSuccess(
        "Arquivo enviado com sucesso! Verifique seu email para mais detalhes."
      );
    } catch (error) {
      setError(
        "Erro ao subir o arquivo. Por favor, tente novamente mais tarde."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div
          className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            Arraste e solte seu arquivo aqui
          </span>
          <span className="text-xs text-gray-500">tsv, txt</span>
        </div>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            File
          </Label>
          <Input
            id="file"
            type="file"
            placeholder="File"
            accept=".tsv, .txt"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}{" "}
          {success && <p className="text-green-500 text-xs">{success}</p>}{" "}
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" disabled={!!error} onClick={handleUpload}>
          {isUploading ? "Enviando..." : "Upload"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
