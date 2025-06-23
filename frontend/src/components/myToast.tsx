import { ExternalToast, toast } from "sonner";

export const myToast = (
  title: string,
  description: string,
  options?: ExternalToast
) => {
  toast(title, {
    description,
    descriptionClassName: "toastDescriptionColor",
    ...options,
  });
};
