import { Button, Tooltip } from "@nextui-org/react"

interface Props {
    chipText: string
    tooltipText: string
}

export const TooltipChip = ({chipText, tooltipText}: Props) => {
    return (
        <Tooltip  trigger="click" portalClassName="@bg-gray-600 @w-60" content={tooltipText}>
        <Button auto flat className="@bg-gray-500 @p-2 @mx-2 @text-white">
          {chipText}
        </Button>
      </Tooltip>
      )
}