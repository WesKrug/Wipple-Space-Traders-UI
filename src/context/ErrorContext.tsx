import React, { ReactNode, createContext, useContext, useState } from 'react';

// Define the type for the error state
type ErrorState = {
  message: string;
  code: number;
};

// Define the context type
type ErrorContextType = {
  errors: ErrorState[];
  addError: (error: ErrorState) => void;
};

// Create the initial context
const initialErrorContext: ErrorContextType = {
  errors: [],
  addError: () => {},
};

// Create the error context
export const ErrorContext = createContext<ErrorContextType>(initialErrorContext);

export function useErrorContext() {
  return useContext(ErrorContext)
}


type ProviderProps = {
  children: ReactNode;
};

export function ErrorContextProvider({children}: ProviderProps) {
const [errors, setErrors] = useState<ErrorState[]>([]);

  const addError = (error: ErrorState) => {
    setErrors((prevErrors) => [...prevErrors, error]);
  };

  return (
    <ErrorContext.Provider value={{ errors, addError }}>
      {children}
    </ErrorContext.Provider>
  );
};
