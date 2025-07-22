export const formatPhoneNumber = (value: string): string => {
  /**
   * Remove all non-numeric characters
   */
  const cleaned = value.replace(/\D/g, "");

  /**
   * Apply formatting
   */
  if (cleaned.length >= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  } else if (cleaned.length >= 3) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length > 0) {
    return `(${cleaned}`;
  }

  return "";
};

export const cleanPhoneNumber = (formatted: string): string => {
  return formatted.replace(/\D/g, "");
};
