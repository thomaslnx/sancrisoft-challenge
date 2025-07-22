import { FC } from "react";

import { useForm } from "@/hooks/useForm";
import { FormContext } from "@/contexts/FormContext";
import { STATES } from "@/constants/FormData";
import { Status } from "@/types";
import { Button } from "@/styles/GlobalStyles";
import {
  ReviewSubmitStepContainer,
  ReviewSection,
  SectionHeader,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  SubmissionResult,
  ButtonContainer,
  EditButton,
} from "@/components/styles";

export const Step3Review: FC = () => {
  const { actions, state } = useForm(FormContext);
  const { data, isSubmitting, submissionResult } = state;

  const getStateName = (abbreviation: string) => {
    const state = STATES.find((st) => st.abbreviation === abbreviation);

    return state ? state.name : abbreviation;
  };

  const isSubmissionStatus = (status: Status): status is "error" | "ok" => {
    return status === "ok" || status === "error";
  };

  const handleSubmit = () => {
    actions.submitForm();
  };

  const isSuccess = submissionResult.status === "ok";
  const isError = submissionResult.status === "error";

  return (
    <ReviewSubmitStepContainer role="main">
      <ReviewSection role="region" aria-labelledby="company-review">
        <SectionHeader>
          <SectionTitle id="company-review">Business Structure</SectionTitle>
          {!isSuccess && (
            <EditButton
              onClick={() => actions.setStep(1)}
              aria-label="Edit contact information"
            >
              Edit
            </EditButton>
          )}
        </SectionHeader>

        <div>
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
          {!isSuccess && (
            <EditButton
              onClick={() => actions.setStep(2)}
              aria-label="Edit contact information"
            >
              Edit
            </EditButton>
          )}
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

      {isSubmissionStatus(submissionResult.status) && (
        <SubmissionResult
          $status={submissionResult.status}
          role="alert"
          aria-live="assertive"
        >
          {submissionResult.message}
        </SubmissionResult>
      )}

      <ButtonContainer role="group" aria-label="Form actions">
        {isSuccess ? (
          <Button
            onClick={actions.resetForm}
            size="lg"
            $fullWidth
            aria-label="Start a new form"
          >
            Start Over →
          </Button>
        ) : isError ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            size="lg"
            $fullWidth
            aria-label={
              isSubmitting ? "Submitting form" : "Try submitting again"
            }
          >
            {isSubmitting ? "Submitting..." : "Confirm & Submit →"}
          </Button>
        ) : null}
      </ButtonContainer>
    </ReviewSubmitStepContainer>
  );
};
