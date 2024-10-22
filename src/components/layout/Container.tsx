import { Header } from "./Header.tsx";
import { FeedbackList } from "../feedback/FeedbackList.tsx";

export const Container = () => {
  return (
    <main className="container">
      <Header/>
      <FeedbackList/>
    </main>
  )
}
