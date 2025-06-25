"use client"

import { useState } from "react"
import {
  PanierHeader,
  IndividualServices,
  TeamServices,
  ProjectDescription,
  EmptyCart,
  OrderSummary,
  mockCartItems,
  mockTeamItems,
  CartItem,
  TeamItem,
} from "@/components/panier"

export default function PanierPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [teamItems, setTeamItems] = useState<TeamItem[]>(mockTeamItems)
  const [projectDescription, setProjectDescription] = useState("")
  const [estimatedBudget, setEstimatedBudget] = useState("")

  const removeCartItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const removeTeamItem = (id: string) => {
    setTeamItems(teamItems.filter((item) => item.id !== id))
  }

  const updateEstimatedHours = (id: string, hours: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, estimatedHours: Math.max(1, hours) } : item)))
  }

  const calculateItemTotal = (item: CartItem) => {
    if (item.priceType === "hour" && item.estimatedHours) {
      return item.priceNumeric * item.estimatedHours
    }
    return item.priceNumeric
  }

  const hasItems = cartItems.length > 0 || teamItems.length > 0

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <PanierHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <IndividualServices
              cartItems={cartItems}
              onRemoveItem={removeCartItem}
              onUpdateHours={updateEstimatedHours}
              calculateItemTotal={calculateItemTotal}
            />

            <TeamServices
              teamItems={teamItems}
              onRemoveTeam={removeTeamItem}
            />

            {hasItems && (
              <ProjectDescription
                projectDescription={projectDescription}
                estimatedBudget={estimatedBudget}
                onDescriptionChange={setProjectDescription}
                onBudgetChange={setEstimatedBudget}
              />
            )}

            {!hasItems && <EmptyCart />}
          </div>

          {/* Sidebar - Summary */}
          {hasItems && (
            <OrderSummary
              cartItems={cartItems}
              teamItems={teamItems}
              calculateItemTotal={calculateItemTotal}
            />
          )}
        </div>
      </div>
    </div>
  )
}
