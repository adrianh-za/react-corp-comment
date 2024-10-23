import React, { useCallback } from 'react'
import { TFeedbackItem } from "../../lib/types.ts";
import { useFeedbackItems } from "../../lib/hooks.ts";

type TFeedbackItemsContext = {
  filteredCompany: string,
  filteredFeedbackItems: TFeedbackItem[],
  isLoading: boolean,
  errorMessage: string,
  handleAddFeedbackItem: (text: string) => void
  handleSelectCompany: (company: string) => void
}

export const FeedbackItemsContext = React.createContext<TFeedbackItemsContext | null>(null);

export type TFeedbackItemsContextProviderProps = {
  children: React.ReactNode
}

export const FeedbackItemsContextProvider = ({ children }: TFeedbackItemsContextProviderProps) => {

  const {
    isLoading,
    errorMessage,
    filteredFeedbackItems,
    saveFeedbackItem,
    loadFeedbackItems,
    setFilteredCompany,
    filteredCompany
  } = useFeedbackItems();

  //Handle selecting a company
  const handleSelectCompany = (company: string) => {
    setFilteredCompany(company);
  }

  //Handle adding a new feedback item
  const handleAddFeedbackItem = useCallback(async (text: string) => {
    //Get the company name by looking for the word that starts with #
    const companyName = text
      .split(" ")
      .find(word => word.startsWith("#"));

    //Company name must consists of at least 2 characters (# and the first letter)
    if (!companyName || companyName.length < 2)
      throw new Error("Company name starting with # not found in feedback text.");

    //Create a new feedback item object
    const newFeedbackItem: TFeedbackItem = {
      id: -1,  //Will be updated by the "server"
      upvoteCount: 0,
      text: text,
      badgeLetter: companyName[0].toUpperCase(),
      company: companyName.substring(1),
      daysAgo: 0,
    }

    //Save items to the server
    await saveFeedbackItem(newFeedbackItem)
      .catch(console.error);

    //Fetch the updated items
    await loadFeedbackItems()
      .catch(console.error);

  }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredCompany,
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        handleAddFeedbackItem,
        handleSelectCompany
      }}>
      {children}
    </FeedbackItemsContext.Provider>
  )
}