import { TFeedbackItem } from "../../lib/types.ts";
import { HashtagItem } from "./HashtagItem.tsx";
import { useMemo } from "react";

export type HashtagListProps = {
  feedbackItems: TFeedbackItem[],
  onSelectCompany: (companyName: string) => void
}

export const HashtagList = (props: HashtagListProps) => {

  //Get a distinct list of company names and their counts
  const companyNameCounts = useMemo(() => {
    return props.feedbackItems.reduce((acc, feedbackItem) => {
      const companyName = feedbackItem.company.trim().toLowerCase();
      acc[companyName] = (acc[companyName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [props.feedbackItems]);

  //Sort company names by count desc
  const sortedCompanyNames = Object.entries(companyNameCounts)
    .sort((a, b) => b[1] - a[1]);

  return (
    <ul className="hashtags">
      {sortedCompanyNames.map((companyNameCount) => {
        return (
          <HashtagItem
            key={companyNameCount[0]}
            companyName={companyNameCount[0]}
            companyNameCount={companyNameCount[1]}
            onClick={props.onSelectCompany}
          />
        )})
      }
    </ul>
  )
}
