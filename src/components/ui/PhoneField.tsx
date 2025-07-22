"use client";

import { FC, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import { COUNTRIES } from "@/constants/FormData";
import { FormGroup, Label, ErrorMessage } from "@/styles/GlobalStyles";
import {
  PhoneContainer,
  CountrySelect,
  PhoneInput,
  SelectDownIcon,
} from "@/components/styles";
import { Country, PhoneFieldProps } from "@/types";
import { formatPhoneNumber } from "@/utils/phone";

export const PhoneField: FC<PhoneFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(`${selectedCountry.phone_code} ${formatted}`);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country =
      COUNTRIES.find((c) => c.phone_code === e.target.value) || COUNTRIES[0];
    setSelectedCountry(country);

    /**
     * Extract just the phone number part (without country code)
     */
    const phoneOnly = value.replace(/^\+\d+\s*/, "");
    onChange(`${country.phone_code} ${phoneOnly}`);
  };

  /*
   * Extract phone number without country code for display
   */
  const phoneNumber = value.replace(/^\+\d+\s*/, "");

  return (
    <FormGroup>
      <Label htmlFor={id}>
        {label}
        {required}
      </Label>

      <PhoneContainer>
        <CountrySelect
          value={selectedCountry.phone_code}
          $countryFlag={selectedCountry.flag_url}
          onChange={handleCountryChange}
          aria-label="Country code"
        >
          {COUNTRIES.map((country) => (
            <option key={country.name} value={country.phone_code}>
              {country.phone_code}
            </option>
          ))}
        </CountrySelect>
        <SelectDownIcon $hasError={!!error}>
          <FaChevronDown />
        </SelectDownIcon>

        <PhoneInput
          id={id}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="(555) 000-0000"
          $hasError={!!error}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="tel"
        />
      </PhoneContainer>
    </FormGroup>
  );
};
