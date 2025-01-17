"use client";
import { SVGProps, useEffect, useState } from "react"; // Import useState for managing file state
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FileUpload() {
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [token, setToken] = useState<string | null>("");

  const [isTokenVerified, setIsTokenVerified] = useState(false);

  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      console.log("Token retrieved from localStorage:", storedToken);
    }
  }, []);

  // Allowed file types
  const allowedTypes = ["text/tab-separated-values", "text/plain"];

  // Handle file change from input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    validateFile(file);
    setFile(file);
  };

  // Handle file drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior (e.g., opening the file)
    const file = event.dataTransfer.files?.[0];
    validateFile(file);
    setFile(file);
  };

  // Validate file type and size
  const validateFile = (file: File | undefined) => {
    if (file) {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        setError("Por favor, faça o upload de um arquivo válido: tsv ou txt.");
        setFileName(null);
        return;
      }

      // Check file size
      if (file.size > 25 * 1024 * 1024) {
        // 25 MB in bytes
        setError("O arquivo deve ser menor que 25 MB.");
        setFileName(null);
        return;
      }

      setError(null); // Clear any previous error
      setFileName(file.name); // Set the uploaded file name
    }
  };

  // Prevent default drag behaviors
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default behavior
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
        setIsTokenVerified(true); // If token is valid, proceed
        setError(null); // Clear token error
      } else {
        setError("Token inválido ou expirado.");
        setIsTokenVerified(false);
      }
    } catch (error) {
      setError("Erro não esperado. Por favor, tente novamente mais tarde.");
      console.log("Token verification failed:", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    await verifyToken(token);

    if (!isTokenVerified) {
      setError("Por favor, verifique seu token antes de enviar o arquivo.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData

    try {
      // URL with query parameters (replace with your dynamic values if needed)
      const url = `https://novopeasonlinebackend-lnq16zyw.b4a.run/api/v1/estoque?cnpj=10.376.703%2F0007-68&token=jscibTLMsm2SAxmcyXo8mbYsnOHPADoXbXPlp9BOG7YmJOZjLcJeYobSSAwIrGrT`;

      // Fetch API call to upload the file
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json", // Accept header
        },
        body: formData, // The FormData object containing the file
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      // Handle success (e.g., show a success message or reset the form)
      setError(null);
      setFileName(null);
      setFile(undefined);
    } catch (error) {
      setError("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div
          className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center"
          onDrop={handleDrop} // Handle drop event
          onDragOver={handleDragOver} // Handle drag over event
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
            onChange={handleFileChange} // Attach the change handler
            className="cursor-pointer"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}{" "}
          {/* Display error message */}
          {fileName && (
            <p className="text-green-500 text-xs">Uploaded file: {fileName}</p>
          )}{" "}
          {/* Display uploaded file name */}
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" disabled={!!error} onClick={handleUpload}>
          {isUploading ? "Carregando..." : "Upload"}
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
