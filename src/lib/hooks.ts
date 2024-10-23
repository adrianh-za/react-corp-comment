import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FeedbackItemsContext } from "../components/contexts/FeedbackItemsContextProvider.tsx";
import { TFeedbackItem } from "./types.ts";
import { getErrorMessage } from "./utils.ts";

export const useFeedbackItemsContext = () => {
  const context = React.useContext(FeedbackItemsContext);

  if (!context)
    throw new Error('useFeedbackItemsContext must be used within a FeedbackItemsContextProvider');

  return context;
}

//Manages the feedback items from the server and updates the state
export const useFeedbackItems = () => {

  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [filteredCompany, setFilteredCompany] = useState<string>("");

  //Fetch feedback items from the server, and update state
  const loadFeedbackItems = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const resp = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");

      //Handle non-200 status codes
      if (!resp.ok) {
        setErrorMessage("An error occurred while fetching feedback items. Code: " + resp.status);
        return;
      }

      //Get the data and populate state
      const data = await resp.json();
      setFeedbackItems(data.feedbacks);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  //Saves a new feedback item to the server
  const saveFeedbackItem = useCallback(async (newFeedbackItem: TFeedbackItem) => {
    //Get the max feedback ID and increment it by 1
    const maxId = feedbackItems
      .reduce((max, item) => item.id > max ? item.id : max, 0);

    newFeedbackItem.id = maxId + 1;  //Only for this project, in real world, this should be handled by the server

    try {
      const resp = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newFeedbackItem),
      })

      //Handle non-200 status codes
      if (!resp.ok) {
        setErrorMessage("An error occurred while fetching feedback items. Code: " + resp.status);
        return;
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
    }
  }, []);

  //Filter feedback items by company name
  const filteredFeedbackItems = useMemo(() => {
    return filteredCompany !== ""
      ? feedbackItems.filter((feedbackItem) => feedbackItem.company.trim().toLowerCase() === filteredCompany)
      : feedbackItems
  }, [filteredCompany, feedbackItems]);

  //When mounted, load the feedback items
  useEffect(() => {
    loadFeedbackItems()
      .catch(console.error);
  }, []);

  return {
    filteredCompany,
    setFilteredCompany,
    filteredFeedbackItems,
    isLoading,
    errorMessage,
    loadFeedbackItems,
    saveFeedbackItem
  };
}

