import { FeedbackContext } from "./createContext";
import { SnackbarProvider, useSnackbar } from "notistack";

export function IntegrationNotistack({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  const showDefaultMessage = (message) => {
    enqueueSnackbar(message);
  };

  const showSuccessMessage = (message) => {
    enqueueSnackbar(message, { variant: "success" });
  };

  const showErrorMessage = (message) => {
    enqueueSnackbar(message, { variant: "error" });
  };

  const showWarningMessage = (message) => {
    enqueueSnackbar(message, { variant: "warning" });
  };
  const showInfoMessage = (message) => {
    enqueueSnackbar(message, { variant: "info" });
  };

  return (
    <FeedbackContext.Provider
      value={{
        showDefaultMessage,
        showSuccessMessage,
        showErrorMessage,
        showWarningMessage,
        showInfoMessage,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export default function FeedbackProvider({ children }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <IntegrationNotistack>{children}</IntegrationNotistack>
    </SnackbarProvider>
  );
}
