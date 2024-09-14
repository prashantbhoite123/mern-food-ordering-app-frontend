import { usegetRestaurant } from "@/Api/RestaurantApi"
import CheckoutButton from "@/components/CheckoutButton"
import MenuItem from "@/components/MenuItem"
import OrderSummary from "@/components/OrderSummary"
import RestaurantInfo from "@/components/RestaurantInfo"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardFooter } from "@/components/ui/card"
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { MenuItem as MenuItemType } from "@/types"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type CartItem = {
  _id: string
  name: string
  price: number
  quantity: number
}

const DetailPage = () => {
  const { restaurantId } = useParams()
  const { restaurant, isLoading } = usegetRestaurant(restaurantId)

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
    return storedCartItems ? JSON.parse(storedCartItems) : []
  })

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      )

      let updatedCartItems

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ]
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      )

      return updatedCartItems
    })
  }

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItem) => {
      const updatedCartItems = prevCartItem.filter(
        (item) => cartItem._id !== item._id
      )
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      )

      return updatedCartItems
    })
  }

  const onCheckout = (userFormData: UserFormData) => {
    console.log("userFormData", userFormData)
  }

  if (isLoading || !restaurant) {
    return "Loading..."
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
          alt=""
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFormCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
