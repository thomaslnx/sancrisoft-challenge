import { ValidationComposer } from "@/utils/validation";
import { FormData } from "@/types";

const validData: FormData = {
  company: {
    name: "Acme Inc.",
    type: "LLC",
    address: {
      line1: "123 Main St",
      line2: "",
      city: "Metropolis",
      state: "NY",
      zip: "12345",
    },
  },
  contact: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
  },
};

describe("ValidationComposer", () => {
  describe("Step 1: Company Info", () => {
    it("should return no errors for valid company info", () => {
      const errors = ValidationComposer.validateStep(1, validData);
      expect(errors).toEqual([]);
    });

    it("should return errors for missing company name", () => {
      const data = {
        ...validData,
        company: { ...validData.company, name: "" },
      };
      const errors = ValidationComposer.validateStep(1, data);
      expect(errors.some((e) => e.field === "name")).toBe(true);
    });

    it("should return errors for invalid zip code", () => {
      const data = {
        ...validData,
        company: {
          ...validData.company,
          address: { ...validData.company.address, zip: "abc" },
        },
      };
      const errors = ValidationComposer.validateStep(1, data);
      expect(errors.some((e) => e.field === "zip")).toBe(true);
    });
  });

  describe("Step 2: Contact Info", () => {
    it("should return no errors for valid contact info", () => {
      const errors = ValidationComposer.validateStep(2, validData);
      expect(errors).toEqual([]);
    });

    it("should return errors for missing email", () => {
      const data = {
        ...validData,
        contact: { ...validData.contact, email: "" },
      };
      const errors = ValidationComposer.validateStep(2, data);
      expect(errors.some((e) => e.field === "email")).toBe(true);
    });

    it("should return errors for invalid phone", () => {
      const data = {
        ...validData,
        contact: { ...validData.contact, phone: "123" },
      };
      const errors = ValidationComposer.validateStep(2, data);
      expect(errors.some((e) => e.field === "phone")).toBe(true);
    });
  });

  describe("Step 3: Review & Submit", () => {
    it("should not return errors for valid data (no validation on step 3)", () => {
      const errors = ValidationComposer.validateStep(3, validData);
      expect(errors).toEqual([]);
    });
  });
});
