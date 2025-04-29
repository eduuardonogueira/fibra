import { toast } from "sonner";

export const myToast = (title: string, description: string) => toast(title, {
  description,
  descriptionClassName: "toastDescriptionColor"
})