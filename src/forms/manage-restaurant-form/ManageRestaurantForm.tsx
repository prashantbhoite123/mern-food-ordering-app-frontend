import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import DetailsSection from "./DetailsSection"
import { Separator } from "@radix-ui/react-separator"
import CuisinesSection from "./CuisinesSection"
import MenuSection from "./MenuSection"
import ImageSection from "./ImageSection"
import { Button } from "@/components/ui/button"
import LoadingButton from "@/components/LoadingButton"
// import { Form } from "@/components/ui/form"

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
  estimatedDeliveryTime: z.string({
    required_error: "estimatedDeliveryTime is required",
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
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItem: [{ name: "", price: 0 }],
    },
  })

  const onSubmit = (formDatajson: restaurantFormData) => {
    const formData = new FormData()

    formData.append("restaurantName", formDatajson.restaurantName)
    formData.append("city", formDatajson.city)
    formData.append("country", formDatajson.country)

    formData.append(
      "deliveryPrice",
      (formDatajson.deliveryPrice * 100).toString()
    )

    formData.append(
      "estimatedDeliveryTime",
      formDatajson.estimatedDeliveryTime.toString()
    )
    formDatajson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}],`, cuisine)
    })

    formDatajson.menuItem.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name)
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      )
    })

    formData.append(`imageFile`, formDatajson.imageFile)
    console.log("This is a form data : ", formData)
    onSave(formData)
  }

  return (
    <FormProvider {...form}>
      {/* <Form {...form}> */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />

        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
      {/* </Form> */}
    </FormProvider>
  )
}

export default ManageRestaurantForm
