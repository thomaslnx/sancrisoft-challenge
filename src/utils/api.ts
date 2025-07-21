import { FormData, ApiResponse } from "@/types";

/**
 * Builder Pattern: API Payload Builder
 */

export class ApiPayloadBuilder {
  #payload: any = {};

  withCompanyData(company: FormData["company"]): this {
    this.#payload.name = company.name;
    this.#payload.type = company.type;
    this.#payload.address = {
      line1: company.address.line1,
      line2: company.address.line2 || "",
      city: company.address.city,
      state: company.address.state,
      zip: company.address.zip,
    };

    return this;
  }

  withContactData(contact: FormData["contact"]): this {
    this.#payload.contact = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    };

    return this;
  }

  build(): any {
    return this.#payload;
  }
}

/**
 * Facade Pattern: API Service
 */

export class ApiService {
  static readonly #API_URL = "https://ss-company.free.beeceptor.com/company";

  static async submitCompany(data: FormData): Promise<ApiResponse> {
    try {
      const payload = new ApiPayloadBuilder()
        .withCompanyData(data.company)
        .withContactData(data.contact)
        .build();

      const response = await fetch(this.#API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      return result;
    } catch (err) {
      return {
        status: "error",
        message: `Something went wrong! Please try again. ERROR: ${err}`,
      };
    }
  }
}
