export type HashtagItemProps = {
  companyName: string;
  companyNameCount: number;
  onClick: (companyName: string) => void;
}

export const HashtagItem = (props: HashtagItemProps) => {
  return (
    <li key={props.companyName}>
      <button onClick={() => props.onClick(props.companyName)}>
        #{props.companyName} {props.companyNameCount}
      </button>
    </li>
  )
}
