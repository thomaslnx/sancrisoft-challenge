"use client";

import styled from "styled-components";

import { Container } from "@/styles/GlobalStyles";

export const FormContainer = styled(Container)`
  min-height: 100vh;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  padding: 44px 114px 0;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 26px;

  @media (max-width: 768px) {
    padding: 44px 21px 0;
  }
`;

export const Title = styled.h1`
  font-family: "Inter", sans-serif;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: normal;
`;

export const Line = styled.hr`
  width: 100%;
  height: 1px;
  border-width: 0;
  background-color: #eceeeb;
`;

export const StepIndicatorContainer = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 150px;
  width: 280px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    min-width: 50px;
    width: 40px;
    display: flex
    justify-content: flex-start;
  }

  @media (min-width: 769px) and (max-width: 868px) {
    min-width: 190px;
    width: 40px;
    display: flex
    justify-content: flex-start;
  }
`;

export const StepList = styled.ol`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 118px;
  justify-content: space-between;
  list-style: none;
  padding: 5px 0;
  height: 155px;
  width: 280px;

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    left: 24px;
    justify-content: space-between;
    list-style: none;
    padding: 5px 0;
    height: 155px;
    width: 280px;
  }
`;

export const StepItem = styled.li<{
  $isActive: boolean;
  $isCompleted: boolean;
  $submissionOk: string;
  $canNavigate: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 26px;
  cursor: ${({ $canNavigate }) => ($canNavigate ? "pointer" : "default")};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StepNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0;
  border-radius: 16px;
  width: 33px;
  height: 155px;
  background-color: #d9d9d9;

  @media (max-width: 768px) {
  }
`;

export const StepNumber = styled.div<{
  $isActive: boolean;
  $isCompleted: boolean;
  $submissionOk: string;
}>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  margin-right: 16px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-right: 0;
  }

  ${({ $isCompleted, $isActive, $submissionOk }) => {
    if ($isCompleted || $submissionOk === "ok") {
      return `
        background-color: #4ade80;
        color: #ffffff;
      `;
    } else if ($isActive) {
      return `
        background-color: #4a3aff;
        color: #ffffff;
      `;
    } else {
      return `
        background-color: #f3f4f6;
        color: #000000;
        border: 1px solid #e5d7eb;
      `;
    }
  }}
`;

export const StepContent = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StepTitle = styled.div<{
  $isActive: boolean;
  $isCompleted: boolean;
}>`
  font-weight: 500;
  font-size: 16px;
  color: #000000;
`;

export const StatusBadge = styled.span<{
  $status: "in-progress" | "success" | "error";
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 18px;
  padding: 4px 4px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 500;
  text-transform: lowercase;
  margin-left: 32px;

  ${({ $status }) => {
    switch ($status) {
      case "in-progress":
        return `
          background-color: rgb(128 128 128 / 0.08);
          color: #ffa500;
        `;
      case "success":
        return `
          background-color: rgba(128 128 128 / 0.08);
          color: #008000;
        `;
      case "error":
        return `
          background-color: #fee2e2;
          color: #dc2626;
        `;
      default:
        return `
          display: none
        `;
    }
  }}
`;

export const FormContentContainer = styled.div`
  display: flex;
  padding: 44px 114px 0;

  @media (max-width: 768px) {
    padding: 44px 21px 0;
  }
`;

export const ContentAreaContainer = styled.div`
  display: flex;
  padding: 10px 114px 0;

  @media (max-width: 768px) {
    padding: 10px 21px 0;
  }

  @media (max-width: 869px) {
    padding: 10px 21px 0;
  }
`;

export const StepContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 410px;
  height: 436px;
  gap: 32px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  height: 34px;
  justify-content: flex-end;
`;

export const PhoneStepContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const PhoneContainer = styled.div`
  display: flex;
  position: relative;
  gap: 0;
`;

export const PhoneInput = styled.input<{ $hasError?: boolean }>`
  flex: 1;
  padding: 14px 16px;
  height: 34px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#ff0000" : "#E5E7EB")};
  border-left: none;
  border-radius: 0 6px 6px 0;
  font-size: 16px;
  background-color: white;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "#ff0000" : "#5D5FEF")};

    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const CountrySelect = styled.select<{
  $countryFlag: string;
}>`
  padding: 1px 2px 1px 50px;
  height: 34px;
  border: 1px solid #e5e7eb;
  border-right: none;
  border-radius: 6px 0 0 6px;
  appearance: none;
  background-image: ${({ $countryFlag }) => `url(${$countryFlag})`};
  background-repeat: no-repeat;
  background-position: left 15px center;
  background-size: 26px;
  position: relative;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
  min-width: 121px;

  &:focus {
    border-color: #5d5fef;
    box-shadow: 0 0 0 3px rgba(93, 95, 239, 0.1);
    outline: none;
  }
`;

export const SelectDownIcon = styled.div<{ $hasError: boolean }>`
  position: absolute;
  top: 50%;
  transform: ${({ $hasError }) =>
    $hasError ? "translate(600%, -41%)" : "translate(600%, -44%)"};
  pointer-events: none;
`;

export const ReviewSubmitStepContainer = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 40px;
`;

export const ReviewSection = styled.div`
  padding-bottom: 32px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  width: 176px;
  line-height: 24px;
  color: #111827;
  margin: 0;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: #4a3aff;
  text-decoration-line: underline;
  text-underline-offset: 3px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    color: #4c4fe8;
  }

  &:focus-visible {
    outline: 2px solid #5d5fef;
    outline-offset: 2px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.span`
  font-size: 18px;
  color: #6b7280;
  width: 137px;
  min-width: 80px;
  margin-right: 16px;
`;

export const InfoValue = styled.span`
  font-size: 14px;
  color: #111827;
  font-weight: 400;
`;

export const SubmissionResult = styled.div<{
  $status: "success" | "error" | "ok";
}>`
  padding: 12px 16px;
  width: 363px;
  height: 64px;
  border-radius: 8px;
  margin-bottom: 0;
  border: 1px solid;

  ${({ $status }) => {
    if ($status === "ok") {
      return `
        background-color: rgba(0, 128, 0, 0.08);
        font-weight: 400;
        font-size: 16px;
        color: #008000;
        border-color: #008000;
      `;
    } else {
      return `
      position: absolute;
      bottom: -100px;
      background-color: rgba(239, 68, 68, 0.08);
      font-weight: 400;
      font-size: 16px;
      color: #ef4444;
      border-color: #ef4444;
    `;
    }
  }}
`;
