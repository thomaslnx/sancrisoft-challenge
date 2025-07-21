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

  ${({ $isCompleted, $isActive }) => {
    if ($isCompleted) {
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
          background-color: #d1fae5;
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
