
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import TreeNode from '@/components/finding-aid/TreeNode';
import AccordionDetails from '@/components/finding-aid/AccordionDetails';
import { cn } from '@/lib/utils';

// Sample data for demonstration
const collectionData = {
  id: "MSS-2023-003",
  name: "James Madison Papers",
  acquisitionDate: "05/12/2023",
  sourceUrl: "https://example.org/archive/madison-papers",
  description: [
    "The James Madison Papers is a comprehensive collection documenting the life and career of the fourth president of the United States. The collection spans from 1723 to 1836 and includes correspondence, personal notes, drafts of speeches and legislation, and financial documents.",
    "Madison served as Secretary of State (1801-1809) and then as President (1809-1817), during which he led the nation through the War of 1812. This collection provides remarkable insight into the early American republic, the drafting of the Constitution and Bill of Rights, and Madison's pivotal role in shaping American political philosophy.",
    "The papers are organized into series based on Madison's career phases and document types, with special attention to his extensive correspondence with figures such as Thomas Jefferson, Alexander Hamilton, and his wife Dolley Madison."
  ],
  accordionSections: [
    {
      title: "Scope and Content Note",
      content: (
        <>
          <p className="mb-3">This collection contains approximately 12,000 items, including personal and official correspondence, legal documents, notes on debates, and drafts of state papers and legislation.</p>
          <p className="mb-3">The collection is particularly rich in documenting Madison's role in the Constitutional Convention of 1787, his partnership with Alexander Hamilton and John Jay in writing The Federalist Papers, his tenure as Jefferson's Secretary of State, and his presidency.</p>
          <p>Special attention has been given to preserving Madison's extensive notes on the Constitutional Convention, which provide one of the most comprehensive firsthand accounts of the debates and proceedings that shaped the United States Constitution.</p>
        </>
      )
    },
    {
      title: "Date Ranges",
      content: (
        <div className="space-y-2">
          <div>
            <div className="font-medium">Inclusive Dates</div>
            <div>1723-1836</div>
          </div>
          <div>
            <div className="font-medium">Bulk Dates</div>
            <div>1780-1817</div>
          </div>
          <div>
            <div className="font-medium">Significant Date Ranges</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Constitutional Convention Period: 1787-1788</li>
              <li>Secretary of State Period: 1801-1809</li>
              <li>Presidential Period: 1809-1817</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Creator Information",
      content: (
        <div className="space-y-2">
          <div>
            <div className="font-medium">Primary Creator</div>
            <div>Madison, James, 1751-1836</div>
          </div>
          <div>
            <div className="font-medium">Biographical Note</div>
            <p>James Madison (March 16, 1751 - June 28, 1836) was an American statesman, diplomat, and Founding Father. He served as the fourth president of the United States from 1809 to 1817. Madison is hailed as the "Father of the Constitution" for his pivotal role in drafting and promoting the Constitution of the United States and the Bill of Rights.</p>
          </div>
        </div>
      )
    },
    {
      title: "Donor Details",
      content: (
        <div className="space-y-2">
          <div>
            <div className="font-medium">Acquisition</div>
            <div>Donated by the Madison Family Trust, 2023</div>
          </div>
          <div>
            <div className="font-medium">Provenance</div>
            <p>The collection was maintained by Dolley Madison after her husband's death in 1836, and subsequently passed through descendants until its donation to the archive.</p>
          </div>
        </div>
      )
    },
    {
      title: "Additional Metadata",
      content: (
        <div className="space-y-3">
          <div>
            <div className="font-medium">Physical Description</div>
            <div>78 boxes (31.2 linear feet); 24 oversize folders</div>
          </div>
          <div>
            <div className="font-medium">Language</div>
            <div>Materials primarily in English with some correspondence in French</div>
          </div>
          <div>
            <div className="font-medium">Access Restrictions</div>
            <div>Open for research. Some fragile originals may require viewing of digital surrogates.</div>
          </div>
          <div>
            <div className="font-medium">Related Materials</div>
            <ul className="list-disc pl-5">
              <li>Thomas Jefferson Papers</li>
              <li>Dolley Madison Collection</li>
              <li>Continental Congress Records</li>
            </ul>
          </div>
        </div>
      )
    }
  ]
};

const FindingAid: React.FC = () => {
  const [activeTab, setActiveTab] = useState("series");

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b border-border bg-white shadow-sm animate-fade-in">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="text-3xl font-bold text-center md:text-left mb-3 tracking-tight">
            {collectionData.name}
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex gap-x-6 mb-2 md:mb-0">
              <span>Collection ID: <span className="font-medium text-foreground">{collectionData.id}</span></span>
              <span>Acquisition Date: <span className="font-medium text-foreground">{collectionData.acquisitionDate}</span></span>
            </div>
            <a 
              href={collectionData.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              View Original Source
              <ExternalLink size={14} className="inline" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container px-4 mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (75%) */}
          <div className="w-full lg:w-3/4 animate-slide-in">
            {/* Overview Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <div className="prose prose-slate max-w-none">
                {collectionData.description.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Interactive Navigation Tabs */}
            <Tabs defaultValue="series" onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 bg-muted">
                <TabsTrigger value="series" className="finding-aid-tab">
                  Series & File Units
                </TabsTrigger>
                <TabsTrigger value="details" className="finding-aid-tab">
                  Finding Aid Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="series" className="mt-0 p-0">
                <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6">
                  <h3 className="text-xl font-medium mb-4">Collection Structure</h3>
                  
                  {/* Hierarchical Tree Structure */}
                  <div className="space-y-2">
                    <TreeNode type="series" title="Series I: Personal Correspondence, 1770-1826">
                      <TreeNode type="file-unit" title="File Unit 1: Family Letters" isDigitized={true}>
                        <TreeNode 
                          type="item" 
                          title="Letter to Dolley Madison, June 15, 1789" 
                          thumbnailUrl="/placeholder.svg"
                          externalUrl="#"
                        />
                        <TreeNode 
                          type="item" 
                          title="Letter from Father, August 3, 1782" 
                          thumbnailUrl="/placeholder.svg"
                          externalUrl="#"
                        />
                      </TreeNode>
                      <TreeNode type="file-unit" title="File Unit 2: Correspondence with Friends" isDigitized={false}>
                        <TreeNode 
                          type="item" 
                          title="Letter from Thomas Jefferson, May 12, 1790" 
                          thumbnailUrl="/placeholder.svg"
                          externalUrl="#"
                        />
                      </TreeNode>
                    </TreeNode>

                    <TreeNode type="series" title="Series II: Political Documents, 1780-1817">
                      <TreeNode type="file-unit" title="File Unit 1: Constitutional Convention Notes" isDigitized={true}>
                        <TreeNode 
                          type="item" 
                          title="Notes on the Constitutional Convention, May-September 1787" 
                          thumbnailUrl="/placeholder.svg"
                          externalUrl="#"
                        />
                        <TreeNode 
                          type="item" 
                          title="Draft of Federalist No. 10, November 1787" 
                          thumbnailUrl="/placeholder.svg"
                          externalUrl="#"
                        />
                      </TreeNode>
                      <TreeNode type="file-unit" title="File Unit 2: Presidential Papers" isDigitized={true}>
                        <TreeNode 
                          type="item" 
                          title="First Inaugural Address, March 4, 1809" 
                          thumbnailUrl="/placeholder.svg"
                          externalUrl="#"
                        />
                        <TreeNode 
                          type="item" 
                          title="War of 1812 Documents" 
                          thumbnailUrl="/placeholder.svg"
                          externalUrl="#"
                        />
                      </TreeNode>
                    </TreeNode>

                    <TreeNode type="series" title="Series III: Financial Records, 1780-1836">
                      <TreeNode type="file-unit" title="File Unit 1: Estate Accounts" isDigitized={false}>
                        <TreeNode 
                          type="item" 
                          title="Montpelier Estate Ledger, 1810-1820" 
                          thumbnailUrl="/placeholder.svg"
                          externalUrl="#"
                        />
                      </TreeNode>
                      <TreeNode type="file-unit" title="File Unit 2: Personal Expenses" isDigitized={false} />
                    </TreeNode>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-0 p-0">
                <div className="bg-white rounded-lg border shadow-sm p-1">
                  <AccordionDetails sections={collectionData.accordionSections} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar (25%) */}
          <div className={cn(
            "w-full lg:w-1/4 flex-shrink-0 animate-fade-in",
            activeTab === "details" ? "lg:order-first" : "lg:order-last"
          )}>
            <aside className="bg-white rounded-lg border shadow-sm p-5">
              <h3 className="text-lg font-semibold mb-3">Research Assistance</h3>
              <p className="text-muted-foreground mb-4">
                Need help navigating this collection or locating specific documents? Our archival team can provide specialized assistance and additional context.
              </p>
              <Button className="w-full">
                Request Research Support
              </Button>
            </aside>

            <div className="mt-6 bg-white rounded-lg border shadow-sm p-5">
              <h3 className="text-lg font-semibold mb-3">Collection Highlights</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Complete set of Madison's Constitutional Convention notes</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Original drafts of multiple Federalist Papers</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Correspondence with all early U.S. presidents</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  <span className="text-muted-foreground">First-hand accounts of the War of 1812</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindingAid;
