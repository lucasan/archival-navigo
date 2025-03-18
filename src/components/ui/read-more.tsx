
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

  // Function to convert newlines to paragraph elements
  const renderTextWithLineBreaks = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className={cn("mb-3", textClassName)}>
        {paragraph}
      </p>
    ));
  };

  if (!needsTruncation) {
    return <div className={className}>{renderTextWithLineBreaks(text)}</div>;
  }

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "overflow-hidden transition-all duration-500 ease-in-out",
        !isOpen && "max-h-[160px]"
      )}>
        {isOpen 
          ? renderTextWithLineBreaks(text)
          : <p className={cn("text-sm md:text-base text-muted-foreground", textClassName)}>{truncatedText}</p>
        }
      </div>
      
      {!isOpen && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none transition-opacity duration-300 ease-in-out" />
      )}
      
      <Button
        variant="link"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "mt-1 p-0 h-auto font-medium relative z-10 transition-all duration-300",
          buttonClassName
        )}
      >
        {isOpen ? "Read Less" : "Read More"}
      </Button>
    </div>
  );
};

export default ReadMore;
