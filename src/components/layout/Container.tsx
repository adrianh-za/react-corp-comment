import { Header } from "./Header.tsx";
import { FeedbackList } from "../feedback/FeedbackList.tsx";
import { TFeedbackItem } from "../../lib/types.ts";

export type ContainerProps = {
  feedbackItems: TFeedbackItem[],
  errorMessage: string,
  isLoading: boolean,
  onAddFeedbackItem: (text: string) => void
}

export const Container = (props : ContainerProps) => {
  return (
    <main className="container">
      <Header
        onAddFeedbackItem={props.onAddFeedbackItem}
      />
      <FeedbackList
        feedbackItems={props.feedbackItems}
        errorMessage={props.errorMessage}
        isLoading={props.isLoading}
      />
    </main>
  )
}
