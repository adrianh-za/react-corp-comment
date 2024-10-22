import React, { useState } from "react";
import { MAX_FEEDBACK_CHARS } from "../../lib/constants.ts";

export type FeedbackFormProps = {
  onAddFeedbackItem: (text: string) => void;
}

const ValidationState = {
  Invalid: 'invalid',
  Valid: 'valid',
  None: 'none'
} as const;

type ValidationState = (typeof ValidationState)[keyof typeof ValidationState]

export const FeedbackForm = (props: FeedbackFormProps) => {
  const [text, setText] = useState('');
  const [validationState, setValidationState] = useState<ValidationState>(ValidationState.None);
  const remainingChars = MAX_FEEDBACK_CHARS - text.length;

  //Handle the text change event of the feedback textarea
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    //Always trim start of the input text
    const inputText = e.target.value.trimStart();

    //Max length of 150 characters, ignore
    if (inputText.length > MAX_FEEDBACK_CHARS) {
      return;
    }

    setText(inputText);
  }

  //Handle the form submit event
  const handleOnFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validation
    if (text.length < 6 || !text.includes('#')) {
      setValidationState(ValidationState.Invalid);
      setTimeout(() => setValidationState(ValidationState.None), 2000);
      return;
    }

    //Submit the feedback item
    setValidationState(ValidationState.Valid);
    setTimeout(() => setValidationState(ValidationState.None), 2000);
    props.onAddFeedbackItem(text);
    setText('');
  }

  const formClassName = `form 
    ${validationState == ValidationState.Valid ? "form--valid" : ""}
    ${validationState == ValidationState.Invalid ? "form--invalid" : ""}`;

  return (
    <form className={formClassName} onSubmit={handleOnFormSubmit}>
      <textarea
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        value={text}
        onChange={handleTextChange}
      />
      <label htmlFor="feedback-textarea">Enter you feedback here, remember to #hashtag the company.</label>
      <div>
        <p className="u-italic">{remainingChars}</p>
        <button
          type="submit"
          disabled={remainingChars === MAX_FEEDBACK_CHARS}
        ><span>Submit</span></button>
      </div>
    </form>
  )
}
