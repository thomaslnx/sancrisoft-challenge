import { Context, useContext } from "react";
import { FormContextType } from "@/types";

export const useForm = (
  formContext: Context<FormContextType | undefined>
): FormContextType => {
  const context = useContext(formContext);

  if (!context) {
    throw new Error("useForm must be used within a FormProvider!");
  }

  return context;
};
