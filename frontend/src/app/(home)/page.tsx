import { DASHBOARD_ROUTER } from "@/constants/routes";
import { redirect } from "next/navigation";

export default async function HomePage() {
  redirect(DASHBOARD_ROUTER);
}
