"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface SlotProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  children?: React.ReactNode;
  asChild?: boolean;
}

const SlotComponent = React.forwardRef<HTMLDivElement, SlotProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    
    return (
      <Comp className={cn(className)} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);

SlotComponent.displayName = "Slot";

export { SlotComponent as Slot };
