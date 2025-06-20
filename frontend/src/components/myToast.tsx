import { toast } from "sonner";

export const myToast = (title: string, description: string) => {
  toast(title, {
    description,
    descriptionClassName: "toastDescriptionColor",
    className: "bg-red-500",
    closeButton: true,
  });
};
