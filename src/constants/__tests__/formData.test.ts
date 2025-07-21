import { COMPANY_TYPES, STATES, STORAGE_KEY } from "@/constants/FormData";

describe("formData constants", () => {
  describe("COMPANY_TYPES", () => {
    it("should contain expected company types", () => {
      expect(COMPANY_TYPES).toHaveLength(11);
      expect(COMPANY_TYPES[0]).toEqual({
        value: "Sole Proprietorship",
        label: "Sole Proprietorship",
      });
      expect(COMPANY_TYPES[4]).toEqual({
        value: "Limited Liability Company (LLC)",
        label: "Limited Liability Company (LLC)",
      });
    });

    it("should have consistent value and label structure", () => {
      COMPANY_TYPES.forEach((type) => {
        expect(type).toHaveProperty("value");
        expect(type).toHaveProperty("label");
        expect(typeof type.value).toBe("string");
        expect(typeof type.label).toBe("string");
      });
    });
  });

  describe("STATES", () => {
    it("should contain all 50 US states", () => {
      expect(STATES).toHaveLength(50);
    });

    it("should have consistent name and abbreviation structure", () => {
      STATES.forEach((state) => {
        expect(state).toHaveProperty("name");
        expect(state).toHaveProperty("abbreviation");
        expect(typeof state.name).toBe("string");
        expect(typeof state.abbreviation).toBe("string");
        expect(state.abbreviation).toHaveLength(2);
      });
    });

    it("should contain expected states", () => {
      const california = STATES.find((state) => state.abbreviation === "CA");
      expect(california).toEqual({
        name: "California",
        abbreviation: "CA",
      });

      const newYork = STATES.find((state) => state.abbreviation === "NY");
      expect(newYork).toEqual({
        name: "New York",
        abbreviation: "NY",
      });
    });
  });

  describe("STORAGE_KEY", () => {
    it("should be a string", () => {
      expect(typeof STORAGE_KEY).toBe("string");
      expect(STORAGE_KEY).toBe("multiStepFormData");
    });
  });
});
