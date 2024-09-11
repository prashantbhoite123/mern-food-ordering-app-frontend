import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

type Props = {
  onChange: (value: string) => void
  sortOption: string
}

const SORT_OPTIONS = [
  {
    lable: "Best match",
    value: "bestMatch",
  },
  {
    lable: "Delivery price",
    value: "deliveryPrice",
  },
  {
    lable: "Estimated delivery time",
    value: "estimatedDeliveryTime",
  },
]

const ShortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedSortLable =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.lable ||
    SORT_OPTIONS[0].lable
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sort by: {selectedSortLable}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ShortOptionDropdown
