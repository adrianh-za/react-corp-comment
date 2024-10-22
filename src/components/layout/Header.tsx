import { Pattern } from "./Pattern.tsx";
import { Logo } from "./Logo.tsx";
import { PageHeading } from "./PageHeading.tsx";
import { FeedbackForm } from "../feedback/FeedbackForm.tsx";
import { useFeedbackItemsContext } from "../../lib/hooks.ts";

export const Header = () => {

  const { handleAddFeedbackItem } = useFeedbackItemsContext();

  return (
    <header>
      <Pattern/>
      <Logo/>
      <PageHeading/>
      <FeedbackForm onAddFeedbackItem={handleAddFeedbackItem}/>
    </header>
  )
}
