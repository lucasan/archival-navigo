
import React from 'react';

export const collectionData = {
  id: "MSS-2023-003",
  name: "James Madison Papers",
  acquisitionDate: "05/12/2023",
  sourceUrl: "https://example.org/archive/madison-papers",
  description: [
    "The James Madison Papers is a comprehensive collection documenting the life and career of the fourth president of the United States. The collection spans from 1723 to 1836 and includes correspondence, personal notes, drafts of speeches and legislation, and financial documents.",
    "Madison served as Secretary of State (1801-1809) and then as President (1809-1817), during which he led the nation through the War of 1812. This collection provides remarkable insight into the early American republic, the drafting of the Constitution and Bill of Rights, and Madison's pivotal role in shaping American political philosophy.",
    "The papers are organized into series based on Madison's career phases and document types, with special attention to his extensive correspondence with figures such as Thomas Jefferson, Alexander Hamilton, and his wife Dolley Madison."
  ],
  collectionHighlights: [
    { text: "Complete set of Madison's Constitutional Convention notes" },
    { text: "Original drafts of multiple Federalist Papers" },
    { text: "Correspondence with all early U.S. presidents" },
    { text: "First-hand accounts of the War of 1812" }
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
