import { ValidationComposer } from "@/utils/validation";
import { FormData } from "@/types";

describe("ValidationComposer", () => {
  it("should return no errors for valid company info (step 1)", () => {
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

    const errors = ValidationComposer.validateStep(1, validData);
    expect(errors).toEqual([]); // No errors expected for valid data
  });

  it("should return no errors for valid contact info (step 2)", () => {
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

    const errors = ValidationComposer.validateStep(2, validData);
    expect(errors).toEqual([]); // No errors expected for valid data
  });
});
