import Header from "@/components/application/Header";
import { MagicLinkLoginForm } from "@/components/login-form";

// email para testar login: pecas.online.agora@gmail.com

export default function Page() {
  return (
    <div className="flex flex-col h-screen w-full container mx-auto">
      <div className="flex h-screen w-full items-center justify-center px-4">
        <MagicLinkLoginForm />
      </div>
    </div>
  );
}
