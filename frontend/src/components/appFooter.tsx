"use server";

import Image from "next/image";

export default async function AppFooter() {
  return (
    <footer className="flex w-full justify-center items-center px-4 pt-4 gap-4">
      <Image
        src="/logo.png"
        alt="logo"
        width={24}
        height={24}
        className="h-8 w-8"
      />
      <p className="text-muted-foreground">
        Desenvolvido por LabTeC/UFRA | Copyright © 2025 - Guarda de Nossa
        Senhora de Nazaré - GNSN.
      </p>
    </footer>
  );
}
