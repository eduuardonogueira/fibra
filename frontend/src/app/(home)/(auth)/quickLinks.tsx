import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quickLinksItems } from "@/hooks/useQuickLinks";
import Link from "next/link";

export default function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acesso Rápido</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {quickLinksItems.map((item) => (
          <Link key={item.title} href={item.url}>
            <Button
              variant="outline"
              className="w-full justify-start hover:cursor-pointer"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
