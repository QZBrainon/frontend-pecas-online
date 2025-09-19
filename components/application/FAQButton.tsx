"use client";
import React, { useEffect, useState, useRef } from "react";

function FAQButton() {
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is outside both the FAQ container and the button
      if (
        faqContainerRef.current &&
        buttonRef.current &&
        !faqContainerRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        setIsFAQOpen(false);
      }
    };

    // Only add the event listener when FAQ is open
    if (isFAQOpen) {
      // Add a small delay to prevent immediate closing
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isFAQOpen]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFAQOpen(!isFAQOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="fixed bottom-12 right-12 bg-emerald-500 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-emerald-600 transition-colors z-50"
        aria-label="Open FAQ"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isFAQOpen && (
        <div
          ref={faqContainerRef}
          className="fixed bottom-28 right-12 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">FAQs</h3>
            <button
              onClick={() => setIsFAQOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close FAQ"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <details className="border-b border-gray-200 dark:border-gray-700">
              <summary className="py-2 cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                EXISTE ALGUM TIPO DE CARENCIA OU FIDELIDADE AO ASSINAR O PLANO?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-300 p-2 pb-3">
                Não, você somente paga referente ao mês de uso sem contrato ou
                algum tipo de fidelidade.
              </p>
            </details>
            <details className="border-b border-gray-200 dark:border-gray-700">
              <summary className="py-2 cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                O SITE TEM ALGUM ACESSO AS INFORMACAOES DE FATURAMENTO DA MINHA
                LOJA?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-300 p-2 pb-3">
                Não, nosso site e somente de anúncios de estoque, anunciamos a
                informação e o próprio lojista fecha a venda direta com o
                cliente, não temos acesso a nenhuma parte do seu sistema
                operacional, apenas aos itens que você tem estoque.
              </p>
            </details>
            <details className="border-b border-gray-200 dark:border-gray-700">
              <summary className="py-2 cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                É DIFICIL SUBIR AS INFORCOES DO ESTOQUES?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-300 p-2 pb-3">
                Não, nosso time te auxilia no primeiro momento sobre a
                formatação padrão dos dados que precisamos de forma simples e
                objetiva.
              </p>
            </details>
            <details className="border-b border-gray-200 dark:border-gray-700">
              <summary className="py-2 cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                NÃO TENHO UMA PESSOA ESPECIFICA PARA GERAR O ARQUIVO DE ESTOQUE
                OU NÃO TENHO MUITO CONHECIMENTO EM INFORMATICA MAIS QUERO
                ANUNCIAR, É POSSIVEL?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-300 p-2 pb-3">
                Sim, nesses casos nosso time mesmo pode fazer esse processo
                facilitanto ao máximo o anuncio de seu estoque.
              </p>
            </details>
            <details className="border-b border-gray-200 dark:border-gray-700">
              <summary className="py-2 cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                PRECISO ENVIAR COM O PREÇO DO ITEM?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-300 p-2 pb-3">
                Voce pode enviar tanto com ou sem o valor dos itens.
              </p>
            </details>
            <details className="border-b border-gray-200 dark:border-gray-700">
              <summary className="py-2 cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                NO PLANO VIP, POSSO COLOCAR UMA PROMOÇAO OU ALGOUMA AÇAO DE
                VENDA JUNTO AO BANNER?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-300 p-2 pb-3">
                Sim, e possível a cada 3 meses você alterar ou colocar uma acao
                de venda no mesmo banner de anuncio.
              </p>
            </details>
            <details className="border-b border-gray-200 dark:border-gray-700">
              <summary className="py-2 cursor-pointer text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                NÃO ENCONTROU A RESPOSTA QUE PROCURA?
              </summary>
              <p className="text-sm text-gray-600 dark:text-gray-300 p-2 pb-3">
                Entre em contato pelo nosso{" "}
                <a
                  href="https://wa.me/+19996585656"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Entrar em contato pelo WhatsApp"
                  className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Whatsapp
                </a>{" "}
                e nosso time de especialistas irá te ajudar.
                <br />
              </p>
            </details>
          </div>
        </div>
      )}
    </>
  );
}

export default FAQButton;
