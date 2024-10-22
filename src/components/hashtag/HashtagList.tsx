import { HashtagItem } from "./HashtagItem.tsx";
import { useMemo } from "react";
import { useFeedbackItemsContext } from "../../lib/hooks.ts";

export const HashtagList = () => {

  const { filteredFeedbackItems, handleSelectCompany } = useFeedbackItemsContext();

  //Get a distinct list of company names and their counts
  const companies = useMemo(() => {
    return filteredFeedbackItems.reduce((acc, feedbackItem) => {
      const companyName = feedbackItem.company.trim().toLowerCase();
      acc[companyName] = (acc[companyName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredFeedbackItems]);

  //Sort company names by count desc
  const sortedCompanies = Object.entries(companies)
    .sort((a, b) => b[1] - a[1]);

  return (
    <ul className="hashtags">
      {sortedCompanies.map((companyNameCount) => {
        return (
          <HashtagItem
            key={companyNameCount[0]}
            companyName={companyNameCount[0]}
            companyNameCount={companyNameCount[1]}
            onClick={handleSelectCompany}
          />
        )
      })
      }
    </ul>
  )
}
