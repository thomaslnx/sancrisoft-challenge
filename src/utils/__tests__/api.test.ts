import { ApiPayloadBuilder, ApiService } from "@/utils/api";
import { FormData } from "@/types";

const mockFormData: FormData = {
  company: {
    name: "Test Company",
    type: "LLC",
    address: {
      line1: "123 Main St",
      line2: "Suite 100",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
  },
  contact: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  },
};

describe("ApiPayloadBuilder", () => {
  it("should build correct payload with company and contact data", () => {
    const payload = new ApiPayloadBuilder()
      .withCompanyData(mockFormData.company)
      .withContactData(mockFormData.contact)
      .build();

    expect(payload).toEqual({
      name: "Test Company",
      type: "LLC",
      address: {
        line1: "123 Main St",
        line2: "Suite 100",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
      contact: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
      },
    });
  });

  it("should handle empty line2 address", () => {
    const dataWithoutLine2 = {
      ...mockFormData,
      company: {
        ...mockFormData.company,
        address: {
          ...mockFormData.company.address,
          line2: "",
        },
      },
    };

    const payload = new ApiPayloadBuilder()
      .withCompanyData(dataWithoutLine2.company)
      .withContactData(dataWithoutLine2.contact)
      .build();

    expect(payload.address.line2).toBe("");
  });

  it("should support method chaining", () => {
    const builder = new ApiPayloadBuilder();
    const result = builder
      .withCompanyData(mockFormData.company)
      .withContactData(mockFormData.contact);

    expect(result).toBe(builder);
  });
});

describe("ApiService", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should submit company data successfully", async () => {
    const mockResponse = {
      status: "ok",
      message: "Thanks for submitting your company! We'll be in touch shortly.",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await ApiService.submitCompany(mockFormData);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://ss-company.free.beeceptor.com/company",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test Company",
          type: "LLC",
          address: {
            line1: "123 Main St",
            line2: "Suite 100",
            city: "New York",
            state: "NY",
            zip: "10001",
          },
          contact: {
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            phone: "+1 (555) 123-4567",
          },
        }),
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it("should handle network errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    const result = await ApiService.submitCompany(mockFormData);

    expect(result).toEqual({
      status: "error",
      message:
        "Something went wrong! Please try again. ERROR: Error: Network error",
    });
  });

  it("should handle API errors", async () => {
    const mockErrorResponse = {
      status: "error",
      message:
        "A company with the same name has been detected. Please change the information entered.",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
    });

    const result = await ApiService.submitCompany(mockFormData);

    expect(result).toEqual(mockErrorResponse);
  });
});
