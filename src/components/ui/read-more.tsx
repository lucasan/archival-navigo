
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ReadMoreProps {
  text: string;
  maxLength?: number;
  className?: string;
  textClassName?: string;
  buttonClassName?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxLength = 600,
  className,
  textClassName,
  buttonClassName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const needsTruncation = text.length > maxLength;
  
  const truncatedText = needsTruncation && !isOpen
    ? `${text.substring(0, maxLength)}...`
    : text;

  if (!needsTruncation) {
    return <p className={cn("text-sm md:text-base text-muted-foreground", textClassName)}>{text}</p>;
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full", className)}
    >
      <p className={cn("text-sm md:text-base text-muted-foreground", textClassName)}>
        {truncatedText}
      </p>
      
      <CollapsibleTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className={cn("mt-2 p-0 h-auto font-medium", buttonClassName)}
        >
          {isOpen ? "Read Less" : "Read More"}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="animate-accordion-down" />
    </Collapsible>
  );
};

export default ReadMore;
