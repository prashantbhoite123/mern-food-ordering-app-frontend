import { Button } from "@/components/ui/button"
import { FormField, FormItem } from "@/components/ui/form"
import { useFieldArray, useFormContext } from "react-hook-form"
import MeniItemInput from "./MeniItemInput" // Corrected component name

const MenuSection = () => {
  const { control } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems", // This should match the array name
  })

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
      </div>

      <FormField
        control={control}
        name="menuItems" // This should refer to the array, not an individual item
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <MeniItemInput
                key={index}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  )
}

export default MenuSection
