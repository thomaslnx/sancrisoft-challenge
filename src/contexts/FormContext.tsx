"use client";

import { createContext, useReducer, useEffect, ReactNode, FC } from "react";

import { FormData, FormState, FormAction, FormContextType } from "@/types";
import { Storage } from "@/utils/storage";
import { ValidationComposer } from "@/utils/validation";
import { ApiService } from "@/utils/api";

/**
 * Reducer with Observer pattern
 */
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };

    case "UPDATE_COMPANY_DATA":
      const updatedCompanyData = {
        ...state.data,
        company: {
          ...state.data.company,
          ...action.payload,
          address: {
            ...state.data.company.address,
            ...(action.payload.address || {}),
          },
        },
      };

      return { ...state, data: updatedCompanyData };

    case "UPDATE_CONTACT_DATA":
      const updatedContactData = {
        ...state.data,
        contact: { ...state.data.contact, ...action.payload },
      };

      return { ...state, data: updatedContactData };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };

    case "SET_SUBMISSION_RESULT":
      return { ...state, submissionResult: action.payload };

    case "RESET_FORM":
      return initialState;

    case "LOAD_SAVED_DATA":
      return { ...state, data: action.payload };

    default:
      return state;
  }
};

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

const initialFormData: FormData = {
  company: {
    name: "",
    type: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
    },
  },
  contact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
};

const initialState: FormState = {
  currentStep: 1,
  data: initialFormData,
  errors: [],
  isSubmitting: false,
  submissionResult: {
    status: "idle",
    message: "",
  },
};

/**
 * Provider component
 */
export const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  /**
   * Load saved data on component mounting.
   */
  useEffect(() => {
    const savedData = Storage.loadFormData();

    if (savedData) {
      dispatch({
        type: "LOAD_SAVED_DATA",
        payload: savedData,
      });
    }
  }, []);

  /**
   * Save data to storage on data change.
   */
  useEffect(() => {
    if (state.data !== initialFormData) {
      Storage.saveFormData(state.data);
    }
  }, [state.data]);

  const actions = {
    setStep: (step: number) => {
      dispatch({
        type: "SET_STEP",
        payload: step,
      });
    },

    updateCompanyData: (data: Partial<FormData["company"]>) => {
      dispatch({
        type: "UPDATE_COMPANY_DATA",
        payload: data,
      });
    },

    updateContactData: (data: Partial<FormData["contact"]>) => {
      dispatch({
        type: "UPDATE_CONTACT_DATA",
        payload: data,
      });
    },

    validateAndProceed: (): boolean => {
      const errors = ValidationComposer.validateStep(
        state.currentStep,
        state.data
      );
      dispatch({
        type: "SET_ERRORS",
        payload: errors,
      });

      if (errors.length === 0) {
        dispatch({
          type: "SET_STEP",
          payload: state.currentStep + 1,
        });
        return true;
      }

      // Focus on the first errored field
      setTimeout(() => {
        const firstErroredField = errors[0]?.field;

        if (firstErroredField) {
          const element = document.getElementById(firstErroredField);
          element?.focus();
        }
      }, 0);

      return false;
    },

    submitForm: async (): Promise<void> => {
      dispatch({ type: "SET_SUBMITTING", payload: true });

      try {
        const result = await ApiService.submitCompany(state.data);
        dispatch({
          type: "SET_SUBMISSION_RESULT",
          payload: result,
        });

        if (result.status === "ok") {
          Storage.clearFormData();
        }
      } catch (err) {
        dispatch({
          type: "SET_SUBMISSION_RESULT",
          payload: {
            status: "error",
            message: `An unexpected error occurred! Please try again. ERROR: ${err}`,
          },
        });
      } finally {
        dispatch({
          type: "SET_SUBMITTING",
          payload: false,
        });
      }
    },

    resetForm: () => {
      Storage.clearFormData();
      dispatch({
        type: "RESET_FORM",
      });
    },

    getFieldError: (field: string): string | undefined => {
      return state.errors.find((error) => error.field === field)?.message;
    },
  };

  return (
    <FormContext.Provider value={{ state, actions }}>
      {children}
    </FormContext.Provider>
  );
};
