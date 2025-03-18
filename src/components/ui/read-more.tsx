
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <div className={cn("relative", className)}>
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        !isOpen && "max-h-[160px]"
      )}>
        <p className={cn("text-sm md:text-base text-muted-foreground", textClassName)}>
          {isOpen ? text : truncatedText}
        </p>
      </div>
      
      {!isOpen && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      )}
      
      <Button
        variant="link"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "mt-1 p-0 h-auto font-medium relative z-10",
          buttonClassName
        )}
      >
        {isOpen ? "Read Less" : "Read More"}
      </Button>
    </div>
  );
};

export default ReadMore;
