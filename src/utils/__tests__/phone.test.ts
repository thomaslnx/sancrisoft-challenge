import { formatPhoneNumber, cleanPhoneNumber } from "../phone";

describe("formatPhoneNumber", () => {
  it("should format phone number correctly", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123456")).toBe("(123) 456-");
    expect(formatPhoneNumber("123")).toBe("(123) ");
    expect(formatPhoneNumber("12")).toBe("(12");
    expect(formatPhoneNumber("1")).toBe("(1");
    expect(formatPhoneNumber("")).toBe("");
  });

  it("should handle partially formatted numbers", () => {
    expect(formatPhoneNumber("(123) 456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123-456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123.456.7890")).toBe("(123) 456-7890");
  });

  it("should limit to 10 digits", () => {
    expect(formatPhoneNumber("12345678901234")).toBe("(123) 456-7890");
  });

  it("should handle special characters", () => {
    expect(formatPhoneNumber("123-456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123.456.7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123 456 7890")).toBe("(123) 456-7890");
  });

  it("should handle edge cases", () => {
    expect(formatPhoneNumber("0")).toBe("(0");
    expect(formatPhoneNumber("00")).toBe("(00");
    expect(formatPhoneNumber("000")).toBe("(000) ");
  });
});

describe("cleanPhoneNumber", () => {
  it("should remove all non-numeric characters", () => {
    expect(cleanPhoneNumber("(123) 456-7890")).toBe("1234567890");
    expect(cleanPhoneNumber("123-456-7890")).toBe("1234567890");
    expect(cleanPhoneNumber("123.456.7890")).toBe("1234567890");
    expect(cleanPhoneNumber("123 456 7890")).toBe("1234567890");
    expect(cleanPhoneNumber("abc123def456ghi7890")).toBe("1234567890");
  });

  it("should handle empty string", () => {
    expect(cleanPhoneNumber("")).toBe("");
  });

  it("should handle strings with no numbers", () => {
    expect(cleanPhoneNumber("abc-def-ghij")).toBe("");
  });

  it("should handle mixed content", () => {
    expect(cleanPhoneNumber("+1 (555) 123-4567 ext. 123")).toBe(
      "15551234567123"
    );
  });
});
