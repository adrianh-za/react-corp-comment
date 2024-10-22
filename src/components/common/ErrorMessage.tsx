export type ErrorMessageProps = {
  message: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div>{props.message}</div>
  )
}