import up from "../../assets/up.svg";
import React, { useState } from "react";

export type FeedbackItemProps = {
  upvoteCount: number;
  feedback: string;
  badgeLetter: string;
  companyName: string;
  daysAgo: number;
}

export const FeedbackItem = (props: FeedbackItemProps) => {

  const [open, setOpen] = useState(false);
  const [votes, setVotes] = useState(props.upvoteCount);
  const className = `feedback ${open ? "feedback--expand" : ""}`;

  const handleUpvoteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    if (votes === props.upvoteCount)
      setVotes(prev => ++prev);
  }

  return (
    <li
      className={className}
      onClick={() => setOpen(prev => !prev)}>

      <button onClick={handleUpvoteClick}>
        <img src={up} alt="up"/>
        <span>{votes}</span>
      </button>

      <div>
        <p>{props.badgeLetter}</p>
      </div>

      <div>
        <p>{props.companyName}</p>
        <p>{props.feedback}</p>
      </div>

      <p>{props.daysAgo === 0 ? "Today" : `${props.daysAgo}d ago`}</p>
    </li>
  )
}
