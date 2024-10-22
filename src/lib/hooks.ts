import React from "react";
import { FeedbackItemsContext } from "../components/contexts/FeedbackItemsContextProvider.tsx";

export const useFeedbackItemsContext = () => {
  const context = React.useContext(FeedbackItemsContext);

  if (!context)
    throw new Error('useFeedbackItemsContext must be used within a FeedbackItemsContextProvider');

  return context;
}