export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface Company {
  name: string;
  type: string;
  address: Address;
}

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface FormData {
  company: Company;
  contact: Contact;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type Status = "idle" | "success" | "error" | "ok";

export interface FormState {
  currentStep: number;
  data: FormData;
  errors: ValidationError[];
  isSubmitting: boolean;
  submissionResult: {
    status: Status;
    message: string;
  };
}

export interface ApiResponse {
  status: Status;
  message: string;
}

export type FormAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "UPDATE_COMPANY_DATA"; payload: Partial<FormData["company"]> }
  | { type: "UPDATE_CONTACT_DATA"; payload: Partial<FormData["contact"]> }
  | { type: "SET_ERRORS"; payload: ValidationError[] }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | {
      type: "SET_SUBMISSION_RESULT";
      payload: { status: Status; message: string };
    }
  | { type: "RESET_FORM" }
  | { type: "LOAD_SAVED_DATA"; payload: FormData };

export interface FormContextType {
  state: FormState;
  actions: {
    setStep: (step: number) => void;
    updateCompanyData: (data: Partial<FormData["company"]>) => void;
    updateContactData: (data: Partial<FormData["contact"]>) => void;
    validateAndProceed: () => boolean;
    submitForm: () => Promise<void>;
    resetForm: () => void;
    getFieldError: (field: string) => string | undefined;
  };
}

export interface StepIndicatorProps {
  $currentStep: number;
  $onStepClick: (step: number) => void;
  $canNavigate: boolean;
}

export interface ProgressIndicatorProps {
  $status: "idle" | "in-progress" | "success" | "error";
}

export interface Option {
  value: string;
  label: string;
}

export interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "select";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: Option[];
  error?: string;
  required?: boolean;
}

export interface CompanyType {
  value: string;
  label: string;
}

export interface State {
  name: string;
  abbreviation: string;
}

export interface Country {
  name: string;
  phone_code: string;
  flag_url: string;
}

export interface PhoneFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}
