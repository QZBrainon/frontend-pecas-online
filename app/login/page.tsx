import Header from "@/components/application/Header";
import { MagicLinkLoginForm } from "@/components/login-form";

// email para testar login: pecas.online.agora@gmail.com

export default function Page() {
  return (
    <div className="flex flex-1 flex-col max-h-screen w-full container mx-auto overflow-hidden">
      <div className="flex w-full items-center justify-center px-4">
        <MagicLinkLoginForm />
      </div>
    </div>
  );
}
