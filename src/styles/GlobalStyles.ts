"use client";

import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #ffffff;
    color: #000000;
  }

  input, select, textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  *:focus {
    outline: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 34px;
  padding: 14px 16px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#ff0000" : "#E1E3EB")};
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "#ff0000" : "#5D5FEF")};
  }

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: #94a3b8;
  }

  &#name {
    margin-bottom: 0 !important;
  }
`;

export const Select = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  height: 34px;
  padding: 3px 16px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#ff0000" : "#E5E7EB")};
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "#ff0000" : "#5D5FEF")};
  }

  &:focus-visible {
    outline: none;
  }

  &:invalid {
    color: #94a3b8;
  }

  option {
    color: #1e293b;
  }

  option[value=""] {
    color: #94a3b8;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  line-height: 24px;
  color: #111827;
  margin-bottom: 8px;
  font-size: 18px;

  &[for="state"] {
    display: none;
  }

  &[for="zip"] {
    display: none;
  }
`;

export const ErrorMessage = styled.span`
  color: #ff0000;
  font-size: 14px;
  font-family: "DM Sans", sans-serif;
  font-weight: 400;
  margin-top: 6px;
  display: block;
  display: flex;
  align-items: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Grid = styled.div<{ $columns?: number }>`
  display: grid;
  height: 34px;
  grid-template-columns: repeat(${({ $columns = 1 }) => $columns}, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

export const Button = styled.button<{
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  transition: all 0.2s ease;
  ${({ $fullWidth }) => $fullWidth && "width: 100%;"}

  &:focus-visible {
    outline: 2px solid #5d5fef;
    outline-offset: 2px;
  }

  ${({ size = "md" }) => {
    switch (size) {
      case "sm":
        return `
          padding: 8px 16px;
          font-size: 14px;
          line-height: 1.4;
        `;
      case "lg":
        return `
          padding: 16px 24px;
          font-size: 16px;
          line-height: 1.5;
        `;
      default:
        return `
          padding: 10px 20px;
          font-size: 14px;
          line-height: 1.4;
        `;
    }
  }}

  ${({ variant = "primary" }) => {
    switch (variant) {
      case "secondary":
        return `
          background-color: #f1f5f9;
          color: #475569;
          &:hover:not(:disabled) {
            background-color: #e2e8f0;
          }
        `;
      case "outline":
        return `
          background-color: transparent;
          color: #475569;
          border: 1px solid #d1d5db;
          &:hover:not(:disabled) {
            background-color: #f9fafb;
            border-color: #9ca3af;
          }
        `;
      default:
        return `
          background-color: #4a3aff;
          color: white;
          &:hover:not(:disabled) {
            background-color: #4C4FE8;
          }
        `;
    }
  }}
  
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
    
    &:focus-visible {
      outline-color: #9ca3af;
    }
  `}
`;
