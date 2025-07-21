import { FormData } from "@/types";
import { STORAGE_KEY } from "@/constants/FormData";

/**
 * Storage Operations using the Facade Pattern
 */
export class Storage {
  static saveFormData(data: FormData): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, serializedData);
    } catch (err) {
      console.error("Failed to save form data: ", err);
    }
  }

  static loadFormData(): FormData | null {
    try {
      const serializedData = localStorage.getItem(STORAGE_KEY);

      if (serializedData) {
        return JSON.parse(serializedData);
      }
    } catch (err) {
      console.error("Failed to load form data: ", err);
    }
    return null;
  }

  static clearFormData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear form data: ", err);
    }
  }
}
