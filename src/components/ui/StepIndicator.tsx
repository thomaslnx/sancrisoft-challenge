"use client";

import { FC } from "react";
import { FaCheck } from "react-icons/fa";

import { useForm } from "@/hooks/useForm";
import { FormContext } from "@/contexts/FormContext";

import { StepIndicatorProps } from "@/types";
import {
  StepIndicatorContainer,
  StepList,
  StepItem,
  StepNumberContainer,
  StepNumber,
  StepContent,
  StepTitle,
} from "@/components/styles";

export const StepIndicator: FC<StepIndicatorProps> = ({
  $currentStep,
  $onStepClick,
  $canNavigate,
}) => {
  const { state } = useForm(FormContext);
  const { submissionResult } = state;

  const steps = [
    {
      number: 1,
      title: "Business structure",
    },
    {
      number: 2,
      title: "Contact person",
    },
    {
      number: 3,
      title: "Review & submit",
    },
  ];

  const handleStepClick = (stepNumber: number) => {
    if ($canNavigate && stepNumber < $currentStep) {
      $onStepClick(stepNumber);
    }
  };

  return (
    <StepIndicatorContainer role="navigation" aria-label="Form Progress">
      <StepNumberContainer />
      <StepList>
        {steps.map((step) => {
          const isActive = step.number === $currentStep;
          const isCompleted = step.number < $currentStep;
          const isClickable = $canNavigate && step.number < $currentStep;

          return (
            <StepItem
              key={step.number}
              $isActive={isActive}
              $isCompleted={isCompleted}
              $submissionOk={submissionResult.status}
              $canNavigate={isClickable}
              onClick={() => handleStepClick(step.number)}
              role="button"
              tabIndex={isClickable ? 0 : -1}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Step ${step.number}: ${step.title}${
                isCompleted || submissionResult.status === "ok"
                  ? " (completed)"
                  : ""
              }${isActive ? " (current)" : ""}`}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && isClickable) {
                  e.preventDefault();
                  handleStepClick(step.number);
                }
              }}
            >
              <StepNumber
                $isActive={isActive}
                $isCompleted={isCompleted}
                $submissionOk={submissionResult.status}
              >
                {isCompleted || submissionResult.status === "ok" ? (
                  <FaCheck size={13} />
                ) : (
                  step.number
                )}
              </StepNumber>
              <StepContent>
                <StepTitle $isCompleted={isCompleted} $isActive={isActive}>
                  {step.title}
                </StepTitle>
              </StepContent>
            </StepItem>
          );
        })}
      </StepList>
      {/* </StepNumberContainer> */}
    </StepIndicatorContainer>
  );
};
