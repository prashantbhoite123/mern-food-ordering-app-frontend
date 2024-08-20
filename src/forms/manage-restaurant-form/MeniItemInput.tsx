import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

type Props = {
  index: number
  removeMenuItem: () => void
}

const MeniItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext()

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItem.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheez Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItem.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="items-center gap-1">
              Price ($)
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit"
      >
        Remove
      </Button>
    </div>
  )
}

export default MeniItemInput
