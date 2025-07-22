import { FC } from "react";

import { useForm } from "@/hooks/useForm";
import { FormContext } from "@/contexts/FormContext";
import { STATES } from "@/constants/FormData";
import { Button } from "@/styles/GlobalStyles";
import {
  ReviewSubmitStepContainer,
  ButtonContainer,
  ReviewSection,
  SectionHeader,
  SectionTitle,
  EditButton,
  InfoRow,
  InfoLabel,
  InfoValue,
} from "@/components/styles";

export const Step3: FC = () => {
  const { actions, state } = useForm(FormContext);
  const { data, isSubmitting } = state;

  const getStateName = (abbreviation: string) => {
    const state = STATES.find((st) => st.abbreviation === abbreviation);
    return state ? state.name : abbreviation;
  };

  const handleSubmit = () => {
    actions.submitForm();
  };

  return (
    <ReviewSubmitStepContainer role="main">
      <ReviewSection role="region" aria-labelledby="company-review">
        <SectionHeader>
          <SectionTitle id="company-review">Business Structure</SectionTitle>
          <EditButton
            onClick={() => actions.setStep(1)}
            aria-label="Edit company information"
          >
            Edit
          </EditButton>
        </SectionHeader>

        <div style={{ height: "120px" }}>
          <InfoRow>
            <InfoLabel>Name:</InfoLabel>
            <InfoValue>{data.company.name}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Type:</InfoLabel>
            <InfoValue>{data.company.type}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Address:</InfoLabel>
            <InfoValue>
              {data.company.address.line1}
              {data.company.address.line2 && (
                <>
                  <br />
                  {data.company.address.line2}
                </>
              )}
              <br />
              {data.company.address.city},{" "}
              {getStateName(data.company.address.state)}{" "}
              {data.company.address.zip}
            </InfoValue>
          </InfoRow>
        </div>
      </ReviewSection>

      <ReviewSection role="region" aria-labelledby="contact-review">
        <SectionHeader>
          <SectionTitle id="contact-review">Contact person</SectionTitle>
          <EditButton
            onClick={() => actions.setStep(2)}
            aria-label="Edit contact information"
          >
            Edit
          </EditButton>
        </SectionHeader>

        <div>
          <InfoRow>
            <InfoLabel>Name:</InfoLabel>
            <InfoValue>
              {data.contact.firstName} {data.contact.lastName}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>{data.contact.email}</InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>Phone:</InfoLabel>
            <InfoValue>{data.contact.phone}</InfoValue>
          </InfoRow>
        </div>
      </ReviewSection>

      <ButtonContainer role="group" aria-label="Form actions">
        <Button
          onClick={handleSubmit}
          size="lg"
          $fullWidth
          aria-label={
            isSubmitting ? "Submitting form data" : "Submit application"
          }
        >
          {isSubmitting ? "Submiting..." : "Confirm & Submit →"}
        </Button>
      </ButtonContainer>
    </ReviewSubmitStepContainer>
  );
};
