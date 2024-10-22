import {Footer} from "./layout/Footer.tsx";
import {Container} from "./layout/Container.tsx";
import {HashtagList} from "./hashtag/HashtagList.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types.ts";

function App() {

  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [filteredCompany, setFilteredCompany] = useState<string>("");

  //Filter feedback items by company
  const filterFeedbackItems = useMemo(() => {
    return filteredCompany !== ""
      ? feedbackItems.filter((feedbackItem) => feedbackItem.company.trim().toLowerCase() === filteredCompany)
      : feedbackItems
    }, [filteredCompany, feedbackItems]);

  //Handle fetch errors
  const handleFetchError = (error: Error | unknown): string => {
    console.log("App - handleFetchError()");

    if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred while fetching feedback items.";
    }
  }

  //Fetch feedback items from the server, and update state
  const loadFeedbackItems = useCallback(async () => {
    console.log("App - loadFeedbackItems()");

    setLoading(true);
    setError("");

    try {
      const resp = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");

      //Handle non-200 status codes
      if (!resp.ok) {
        setError("An error occurred while fetching feedback items. Code: " + resp.status);
        return;
      }

      //Get the data and populate state
      const data = await resp.json();
      setFeedbackItems(data.feedbacks);
    } catch (error) {
      const errorMessage = handleFetchError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  //Save feedback item to the server
  const saveFeedbackItem = useCallback(async (newFeedbackItem: TFeedbackItem) => {
    console.log("App - saveFeedbackItem()");

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
        setError("An error occurred while fetching feedback items. Code: " + resp.status);
        return;
      }
    } catch (error) {
      const errorMessage = handleFetchError(error);
      setError(errorMessage);
    }
  }, []);

  //Handle adding a new feedback item
  const handleAddFeedbackItem = useCallback(async (text: string) => {
    console.log("App - handleAddFeedbackItem()");

    //Get the max feedback ID and increment it by 1
    const maxId = feedbackItems
      .reduce((max, item) => item.id > max ? item.id : max, 0);

    //Get the company name by looking for the word that starts with #
    const companyName = text
      .split(" ")
      .find(word => word.startsWith("#"));

    //Company name must consists of at least 2 characters (# and the first letter)
    if (!companyName || companyName.length < 2)
      throw new Error("Company name starting with # not found in feedback text.");

    //Create a new feedback item object
    const newFeedbackItem: TFeedbackItem = {
      id: maxId + 1,  //Only for this project, in real world, this should be handled by the server
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

  const handleSelectCompany = (company: string) => {
    console.log("App - handleSelectCompany()");
    setFilteredCompany(company);
  }

  useEffect(() => {
    console.log("App - useEffect()");

    loadFeedbackItems().catch(console.error);
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container
        feedbackItems={filterFeedbackItems}
        isLoading={loading}
        errorMessage={error}
        onAddFeedbackItem={handleAddFeedbackItem}
      />
      <HashtagList
        feedbackItems={feedbackItems}
        onSelectCompany={handleSelectCompany}
      />
    </div>
  )
}

export default App


