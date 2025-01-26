import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import type { Deal, CRMStatus, CRMCategory, Customer, User } from './types'
import { DealCard } from './DealCard'
import { Droppable, Draggable } from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'
import { NewDealForm } from './NewDealForm'

type KanbanColumnProps = {
  status: CRMStatus
  deals: Deal[]
  users?: Partial<User>[]
  customers: Partial<Customer>[]
  categories: CRMCategory[]
  onDealClick: (deal: Deal) => void
  calculateColumnValue: (deals: Deal[]) => number
  calculateWeightedValue: (deals: Deal[], status: CRMStatus) => number
  addNewDeal?: (deal: Deal) => void
  onAddCustomer: (customer: Partial<Customer>) => void
}

export function KanbanColumn({
  status,
  deals,
  users,
  customers,
  categories,
  onDealClick,
  calculateColumnValue,
  calculateWeightedValue,
  addNewDeal,
  onAddCustomer,
}: KanbanColumnProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col w-80">
      <h2 className="text-xl font-semibold mb-4">{status}</h2>
      {addNewDeal && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              users={users}
              categories={categories}
              onSubmit={addNewDeal}
              onAddCustomer={onAddCustomer}
              onClose={() => setIsDialogOpen(false)} // Pass the onClose prop to NewDealForm
            />
          </DialogContent>
        </Dialog>
      )}
      <Droppable droppableId={status} isDropDisabled={false}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-100 p-4 rounded-lg flex-grow min-h-[200px] shadow-inner"
          >
            {deals.map((deal, index) => (
              <Draggable key={deal.id.toString()} draggableId={deal.id.toString()} index={deal.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DealCard
                      deal={deal}
                      customer={customers.find((c) => c.id === deal.customer.id)}
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
          Total:{' '}
          <span className="text-green-600">£{calculateColumnValue(deals).toLocaleString()}</span>
        </p>
        <p className="font-semibold">
          Weighted:{' '}
          <span className="text-blue-600">
            £{calculateWeightedValue(deals, status).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  )
}
