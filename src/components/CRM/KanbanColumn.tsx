import React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import type { Deal, Status, Category, Customer } from './types'
import { DealCard } from "./DealCard"
import { Droppable, Draggable, type DroppableProvided, type DraggableProvided } from "react-beautiful-dnd"
import NewDealForm from "./NewDealForm"

type KanbanColumnProps = {
  status: Status
  deals: Deal[]
  customers: Customer[]
  categories: Category[]
  onDealClick: (deal: Deal) => void
  calculateColumnValue: (deals: Deal[]) => number
  calculateWeightedValue: (deals: Deal[], status: Status) => number
  addNewDeal?: (deal: Omit<Deal, "id">) => Promise<void>
  updateDeal: (deal: Deal) => Promise<void>
  onAddCustomer: (customer: Omit<Customer, "id">) => Promise<void>
}

export function KanbanColumn({
  status,
  deals,
  customers,
  categories,
  onDealClick,
  calculateColumnValue,
  calculateWeightedValue,
  addNewDeal,
  updateDeal,
  onAddCustomer,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col w-80">
      <h2 className="text-xl font-semibold mb-4">{status}</h2>
      {addNewDeal && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4 w-full bg-green-500 hover:bg-green-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Deal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
            </DialogHeader>
            <NewDealForm
              customers={customers}
              categories={categories}
              onSubmit={addNewDeal}
              onUpdate={updateDeal}
              onAddCustomer={onAddCustomer}
            />
          </DialogContent>
        </Dialog>
      )}
      <Droppable droppableId={status}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-100 p-4 rounded-lg flex-grow min-h-[200px] shadow-inner"
          >
            {deals.map((deal, index) => (
              <Draggable key={deal.id} draggableId={deal.id} index={index}>
          {(provided: DraggableProvided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <DealCard
                deal={deal}
                customer={customers.find((c) => c.id === deal.customerId)}
                categories={categories}
                onClick={() => onDealClick(deal)}
              />
            </div>
          )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="mt-4 text-sm bg-white p-3 rounded-lg shadow">
        <p className="font-semibold">
          Total: <span className="text-green-600">${calculateColumnValue(deals).toLocaleString()}</span>
        </p>
        <p className="font-semibold">
          Weighted: <span className="text-blue-600">${calculateWeightedValue(deals, status).toLocaleString()}</span>
        </p>
      </div>
    </div>
  )
}

