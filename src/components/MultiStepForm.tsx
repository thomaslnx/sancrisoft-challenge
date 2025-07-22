"use client";

import { FC } from "react";
import { useForm } from "@/hooks/useForm";

import { StepIndicator } from "@/components/ui/StepIndicator";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { Step1 } from "@/components/steps/Step1";
import { Step2 } from "@/components/steps/Step2";
import { Step3 } from "@/components/steps/Step3";
import { Step3Review } from "@/components/steps/Step3Review";

import { FormContext } from "@/contexts/FormContext";
import {
  FormContainer,
  Header,
  Title,
  Line,
  FormContentContainer,
  ContentAreaContainer,
} from "./styles";

const MultiStepForm: FC = () => {
  const { state, actions } = useForm(FormContext);
  const { currentStep, submissionResult } = state;

  const getProgressStatus = () => {
    if (submissionResult.status === "ok") return "success";
    if (submissionResult.status === "error") return "error";
    if (hasUserData()) return "in-progress";

    return "idle";
  };

  const hasUserData = () => {
    const { company, contact } = state.data;

    return !!(
      company.name ||
      company.type ||
      company.address.line1 ||
      company.address.city ||
      company.address.state ||
      company.address.zip ||
      contact.firstName ||
      contact.lastName ||
      contact.email ||
      contact.phone
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return submissionResult.status === "idle" ? <Step3 /> : <Step3Review />;
      default:
        return <Step1 />;
    }
  };

  const canNavigateSteps = submissionResult.status !== "success";

  return (
    <FormContainer role="main">
      <Header role="banner">
        <Title>New Company</Title>
        <ProgressIndicator $status={getProgressStatus()} />
      </Header>
      <Line />
      <FormContentContainer>
        <StepIndicator
          $currentStep={currentStep}
          $onStepClick={actions.setStep}
          $canNavigate={canNavigateSteps}
        />

        <ContentAreaContainer>{renderStep()}</ContentAreaContainer>
      </FormContentContainer>
    </FormContainer>
  );
};

export default MultiStepForm;
