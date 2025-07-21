import { ValidationError, FormData } from "@/types";

/**
 * Factory pattern: Validation Rule Factory
 */

export class ValidationRule {
  static createRule(
    type: string,
    field: string,
    value: string
  ): ValidationError | null {
    switch (type) {
      case "required":
        return this.#required(field, value);
      case "email":
        return this.#email(field, value);
      case "zip":
        return this.#zip(field, value);
      case "phone":
        return this.#phone(field, value);
      default:
        return null;
    }
  }

  static #getFieldLabel(field: string): string {
    const labels: { [key: string]: string } = {
      name: "Company name",
      type: "Company type",
      line1: "Address line 1",
      city: "City",
      state: "State",
      zip: "Zip Code",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone number",
    };

    return labels[field] || field;
  }

  static #required(field: string, value: string): ValidationError | null {
    if (!value || value.trim() === "") {
      return {
        field,
        message: `${this.#getFieldLabel(field)} is required!`,
      };
    }

    return null;
  }

  static #email(field: string, value: string): ValidationError | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return {
        field,
        message: "Please enter a valid email address!",
      };
    }

    return null;
  }

  static #zip(field: string, value: string): ValidationError | null {
    const zipRegex = /^\d{5}$/;

    if (!zipRegex.test(value)) {
      return {
        field,
        message: "Zip code must be 5 digits",
      };
    }

    return null;
  }

  static #phone(field: string, value: string): ValidationError | null {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (!phoneRegex.test(value)) {
      return {
        field,
        message: "Phone number must be in format (000) 000-00000",
      };
    }

    return null;
  }
}

/**
 * Composite Pattern: Validation Composer
 */

export class ValidationComposer {
  static validateStep(step: number, data: FormData): ValidationError[] {
    const errors: ValidationError[] = [];

    if (step === 1) {
      errors.push(...this.#validateCompanyInfo(data));
    } else if (step === 2) {
      errors.push(...this.#validateContactInfo(data));
    }

    return errors.filter((error) => error !== null);
  }

  static #validateCompanyInfo(data: FormData): ValidationError[] {
    const errors: ValidationError[] = [];
    const { company } = data;

    const requiredFields = ["name", "type", "line1", "city", "state", "zip"];

    requiredFields.forEach((field) => {
      const value = this.#getNestedValue(company, field);
      const error = ValidationRule.createRule("required", field, value);

      if (error) {
        errors.push(error);
      }
    });

    if (company.address.zip) {
      const zipError = ValidationRule.createRule(
        "zip",
        "zip",
        company.address.zip
      );

      if (zipError) {
        errors.push(zipError);
      }
    }

    return errors;
  }

  static #validateContactInfo(data: FormData): ValidationError[] {
    const errors: ValidationError[] = [];
    const { contact } = data;

    const requiredFields = ["firstName", "lastName", "email", "phone"];

    requiredFields.forEach((field) => {
      const value = (contact as any)[field];
      const error = ValidationRule.createRule("required", field, value);

      if (error) {
        errors.push(error);
      }
    });

    if (contact.email) {
      const emailError = ValidationRule.createRule(
        "email",
        "email",
        contact.email
      );

      if (emailError) {
        errors.push(emailError);
      }
    }

    if (contact.phone) {
      const phoneError = ValidationRule.createRule(
        "phone",
        "phone",
        contact.phone
      );

      if (phoneError) {
        errors.push(phoneError);
      }
    }

    return errors;
  }

  static #getNestedValue(obj: any, path: string): string {
    if (
      path === "line1" ||
      path === "line2" ||
      path === "city" ||
      path === "state" ||
      path === "zip"
    ) {
      return obj.address[path] || "";
    }

    return obj[path] || "";
  }
}
