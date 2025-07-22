"use client";

import { FC } from "react";

import { PhoneStepContainer, ButtonContainer } from "@/components/styles";
import { Grid, Button } from "@/styles/GlobalStyles";
import { useForm } from "@/hooks/useForm";
import { FormContext } from "@/contexts/FormContext";
import { PhoneField } from "@/components/ui/PhoneField";
import { FormField } from "@/components/ui/FormField";

export const Step2: FC = () => {
  const { state, actions } = useForm(FormContext);
  const { contact } = state.data;

  const handleContactChange = (field: string, value: string) => {
    actions.updateContactData({
      [field]: value,
    });
  };

  const handleContinue = () => {
    actions.validateAndProceed();
  };

  return (
    <PhoneStepContainer>
      <div>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#111827",
            marginBottom: "16px",
          }}
        >
          Name
        </h3>

        <Grid className="name-phone" $columns={2}>
          <FormField
            id="firstName"
            label=""
            value={contact.firstName}
            onChange={(value) => handleContactChange("firstName", value)}
            placeholder="First name"
            error={actions.getFieldError("firstName")}
            required
          />

          <FormField
            id="lastName"
            label=""
            value={contact.lastName}
            onChange={(value) => handleContactChange("lastName", value)}
            placeholder="Last name"
            error={actions.getFieldError("lastName")}
            required
          />
        </Grid>
      </div>

      <div>
        <FormField
          id="email"
          label="Email"
          type="email"
          value={contact.email}
          onChange={(value) => handleContactChange("email", value)}
          placeholder="john@company.com"
          error={actions.getFieldError("email")}
          required
        />
      </div>

      <div>
        <PhoneField
          id="phone"
          label="Phone"
          value={contact.phone}
          onChange={(value) => handleContactChange("phone", value)}
          error={actions.getFieldError("phone")}
          required
        />
      </div>

      <ButtonContainer>
        <Button
          onClick={handleContinue}
          size="lg"
          $fullWidth
          aria-label="Continue to next step"
        >
          Continue →
        </Button>
      </ButtonContainer>
    </PhoneStepContainer>
  );
};
