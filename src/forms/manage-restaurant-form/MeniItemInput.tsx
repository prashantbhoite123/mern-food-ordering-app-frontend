import { useFormContext } from "react-hook-form"

type Props = {
  index: number
  removeMenuItem: () => void
}

const MeniItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext()
}

export default MeniItemInput
