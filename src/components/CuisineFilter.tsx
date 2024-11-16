import { cuisineList } from "@/config/restaurant-option-config"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"

type Props = {
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[]
  isExpanded: boolean

  onExpandedClick: () => void
}

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handekCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisines = event.target.value
    const isChecked = event.target.checked

    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisines]
      : selectedCuisines.filter((cuisines) => cuisines !== clickedCuisines)

    onChange(newCuisinesList)
  }
  const handleCuisinesReset = () => onChange([])
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisines</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filter
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {cuisineList
          ?.slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine)
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  hidden
                  value={cuisine}
                   checked={isSelected}
                  onChange={handekCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            )
          })}

        <Button onClick={onExpandedClick} variant="link" className="mt-4 flex">
          {isExpanded ? (
            <span className="flex flex-row items-center ">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center ">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  )
}

export default CuisineFilter
