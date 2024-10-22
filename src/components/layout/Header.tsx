import { Pattern } from "./Pattern.tsx";
import { Logo } from "./Logo.tsx";
import { PageHeading } from "./PageHeading.tsx";
import { FeedbackForm } from "../feedback/FeedbackForm.tsx";

export type HeaderProps = {
  onAddFeedbackItem: (text: string) => void
}

export const Header = (props: HeaderProps) => {

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm
        onAddFeedbackItem={props.onAddFeedbackItem} />
    </header>
  )
}
