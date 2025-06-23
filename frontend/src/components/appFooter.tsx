"use server";

import Image from "next/image";

export default async function AppFooter() {
  return (
    <footer className="flex w-full justify-center items-center px-4 pt-4 gap-2 box-border">
      <Image
        src="/logo.png"
        alt="logo"
        width={20}
        height={20}
        className="h-6 w-6"
      />
      <p className="text-muted-foreground text-sm">
        Desenvolvido por LabTeC/UFRA | Copyright © 2025 - Guarda de Nossa
        Senhora de Nazaré - GNSN.
      </p>
    </footer>
  );
}
