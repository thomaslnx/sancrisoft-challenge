"use client";

import MultiStepForm from "@/components/MultiStepForm";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { FormProvider } from "@/contexts/FormContext";

export default function Home() {
  return (
    <div>
      <main>
        <GlobalStyles />
        <FormProvider>
          <MultiStepForm />
        </FormProvider>
      </main>
    </div>
  );
}
