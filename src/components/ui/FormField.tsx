"use client";

import React from "react";
import styled from "styled-components";
import { GoAlertFill } from "react-icons/go";

import { Option, FormFieldProps } from "@/types";
import {
  Input,
  Select,
  Label,
  ErrorMessage,
  FormGroup,
} from "../../styles/GlobalStyles";

const StyledFormGroup = styled(FormGroup)`
  position: relative;
  margin-bottom: 16px;

  &#name {
    margin-bottom: 16px;
  }

  &#firstName {
    margin-bottom: 0;
  }
`;

const getAutocompleteAttribute = (id: string): string => {
  const autocompleteMap: { [key: string]: string } = {
    name: "organization",
    firstName: "given-name",
    lastName: "family-name",
    email: "email",
    phone: "tel",
    line1: "address-line1",
    line2: "address-line2",
    city: "address-level2",
    state: "address-level1",
    zip: "postal-code",
  };

  return autocompleteMap[id] || "off";
};

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  options,
  error,
  required = false,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <StyledFormGroup>
      <Label htmlFor={id}>{label}</Label>

      {type === "select" ? (
        <Select
          id={id}
          value={value}
          onChange={handleChange}
          $hasError={!!error}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={getAutocompleteAttribute(id)}
        >
          <option value="" disabled>
            {placeholder || `Select ${label.toLowerCase()}`}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          $hasError={!!error}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete={getAutocompleteAttribute(id)}
        />
      )}

      {error && (
        <ErrorMessage id={`${id}-error`} role="alert" aria-live="polite">
          <GoAlertFill
            size={20}
            style={{ marginRight: 4 }}
            color="#ffffff"
            fill="red"
          />
          {error}
        </ErrorMessage>
      )}
    </StyledFormGroup>
  );
};
