
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionSectionProps = {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
};

type AccordionDetailsProps = {
  sections: AccordionSectionProps[];
};

const AccordionDetails: React.FC<AccordionDetailsProps> = ({ sections }) => {
  return (
    <Accordion type="multiple" className="w-full">
      {sections.map((section, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
          <AccordionTrigger className="text-left text-lg font-medium py-4 hover:no-underline hover:bg-secondary/50 px-4 rounded-md transition-colors">
            {section.title}
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4 text-muted-foreground">
            {section.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionDetails;
