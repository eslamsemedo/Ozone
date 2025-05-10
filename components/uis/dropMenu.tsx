"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

type Checked = DropdownMenuCheckboxItemProps["checked"]


export default function dropMenu(
  { menuName, menu, allsets }:
    {
      menuName: string,
      menu: string[],
      allsets: React.Dispatch<React.SetStateAction<any>>
    }) {
  const [showStatusBar, setShowStatusBar] = React.useState<string[]>([])
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  React.useEffect(()=>{
    allsets(showStatusBar)
  },[showStatusBar])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`bg-white`}>
          {menuName}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white rounded-3xl max-h-[200px] overflow-auto">
        {
          menu.map((value, i) => {
            return (
              
                <DropdownMenuCheckboxItem
                  checked={showStatusBar.includes(value)}
                  onCheckedChange={() => {
                    if (!showStatusBar.includes(value)) {
                      setShowStatusBar([...showStatusBar, value])
                    } else {
                      setShowStatusBar(showStatusBar.filter((value) => value != value))
                    }
                  }}
                  key={i}
                  className={`rounded-2xl bg-[#b0b0b0] m-1 `}
                >
                  {value}
                </DropdownMenuCheckboxItem>
                
              
            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}





