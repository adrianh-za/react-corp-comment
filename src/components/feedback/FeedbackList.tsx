import { FeedbackItem, FeedbackItemProps } from "./FeedbackItem.tsx";
import { Spinner } from "../common/Spinner.tsx";
import { ErrorMessage } from "../common/ErrorMessage.tsx";
import { TFeedbackItem } from "../../lib/types.ts";

export type FeedbackListProps = {
  feedbackItems: TFeedbackItem[],
  errorMessage: string,
  isLoading: boolean
}

export const FeedbackList = (props: FeedbackListProps) => {

  return (
    <ol className="feedback-list">

      {props.isLoading && <Spinner/>}

      {props.errorMessage && <ErrorMessage message={props.errorMessage}/>}

      {
        !props.isLoading && props.feedbackItems.map((feedbackItem, index) => {

          //Create props object for FeedbackItem component
          const props: FeedbackItemProps = {
            upvoteCount: feedbackItem.upvoteCount,
            feedback: feedbackItem.text,
            badgeLetter: feedbackItem.badgeLetter,
            companyName: feedbackItem.company,
            daysAgo: feedbackItem.daysAgo,
          }

          //Render FeedbackItem component with props
          return <FeedbackItem key={index} {...props} />
        })
      }
    </ol>
  )
}

//Some older code for reference
// useEffect(() => {
//   console.log("useEffect()");
//
//   //Reset state
//   // setLoading(true);
//   // setFeedbackItems([]);
//   // setError("");
//
//   // //Old way of fetching data
//   // fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks")
//   //   .then(response => {
//   //     if (!response.ok) {
//   //       throw new Error("An error occurred while fetching feedback items. Code: " + response.status);
//   //     }
//   //     return response.json();
//   //   })
//   //   .then(data => setFeedbackItems(data.feedbacks))
//   //   .catch(error => setError(error.message))
//   //   .finally(() => setLoading(false));
//
//
//   //New way of fetching data
//   // const fetchData = async () => {
//   //   setLoading(true);
//   //   setFeedbackItems([]);
//   //   setError("");
//   //
//   //   try {
//   //     const items = await fetchFeedbackItems();
//   //     setFeedbackItems(items);
//   //   } catch (error) {
//   //     const errorMessage = handleFetchError(error);
//   //     setError(errorMessage);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//
// }, []);