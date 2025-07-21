"use client";

import { FC } from "react";

import { useForm } from "@/hooks/useForm";
import { FormField } from "@/components/ui/FormField";
import { FormContext } from "@/contexts/FormContext";
import { COMPANY_TYPES, STATES } from "@/constants/FormData";
import { Grid, Button } from "@/styles/GlobalStyles";

import { StepContainer, ButtonContainer } from "@/components/styles";

export const Step1: FC = () => {
  const { state, actions } = useForm(FormContext);
  const { company } = state.data;

  const handleCompanyChange = (field: string, value: string) => {
    if (field === "name" || field === "type") {
      actions.updateCompanyData({
        [field]: value,
      });
    } else {
      actions.updateCompanyData({
        address: {
          ...company.address,
          [field]: value,
        },
      });
    }
  };

  const handleContinue = () => {
    actions.validateAndProceed();
  };

  return (
    <StepContainer aria-labelledby="step1-heading">
      <div>
        <FormField
          id="name"
          label="Business name"
          value={company.name}
          onChange={(value) => handleCompanyChange("name", value)}
          placeholder="Registered business name"
          error={actions.getFieldError("name")}
          required
        />

        <FormField
          id="type"
          label="Type"
          type="select"
          value={company.type}
          onChange={(value) => handleCompanyChange("type", value)}
          placeholder="Type of business"
          options={COMPANY_TYPES}
          error={actions.getFieldError("type")}
          required
        />
      </div>

      <div>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "16px",
          }}
        >
          Address
        </h3>

        <FormField
          id="line1"
          label=""
          value={company.address.line1}
          onChange={(value) => handleCompanyChange("line1", value)}
          placeholder="Address line 1"
          error={actions.getFieldError("line1")}
          required
        />

        <FormField
          id="line2"
          label=""
          value={company.address.line2 || ""}
          onChange={(value) => handleCompanyChange("line2", value)}
          placeholder="Address line 2 (optional)"
        />

        <FormField
          id="city"
          label=""
          value={company.address.city}
          onChange={(value) => handleCompanyChange("city", value)}
          placeholder="City"
          error={actions.getFieldError("city")}
          required
        />

        <Grid $columns={2}>
          <FormField
            id="state"
            label=""
            type="select"
            value={company.address.state}
            onChange={(value) => handleCompanyChange("state", value)}
            placeholder="State"
            options={STATES.map((state) => ({
              value: state.abbreviation,
              label: state.name,
            }))}
            error={actions.getFieldError("state")}
            required
          />

          <FormField
            id="zip"
            label=""
            value={company.address.zip}
            onChange={(value) => handleCompanyChange("zip", value)}
            placeholder="Zip"
            error={actions.getFieldError("zip")}
            required
          />
        </Grid>
      </div>

      <ButtonContainer>
        <Button
          onClick={handleContinue}
          size="sm"
          $fullWidth
          aria-label="Continue to next step"
        >
          Continue →
        </Button>
      </ButtonContainer>
    </StepContainer>
  );
};
