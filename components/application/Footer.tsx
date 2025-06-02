import React from "react";

function Footer() {
  return (
    <footer className="text-center py-8 text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()} Peças Por Código. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}

export default Footer;
