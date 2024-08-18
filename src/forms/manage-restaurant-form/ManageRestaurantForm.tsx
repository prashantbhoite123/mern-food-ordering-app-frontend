import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import DetailsSection from "./DetailsSection"

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restaurant name is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  menuItem: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
})

type restaurantFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (restaurantFormData: FormData) => void
  isLoading: boolean
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  console.log(onSave, isLoading)
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItem: [{ name: "", price: 0 }],
    },
  })

  const onSubmit = (formDatajson: restaurantFormData) => {
    console.log(formDatajson)
    // TODO - convert formDatajson to a new FormData object
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
      </form>
    </FormProvider>
  )
}

export default ManageRestaurantForm
