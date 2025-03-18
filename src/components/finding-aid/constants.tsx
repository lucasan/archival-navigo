
import React from 'react';

export const collectionData = {
  id: "MSS-2023-003",
  name: "James Madison Papers",
  acquisitionDate: "05/12/2023",
  sourceUrl: "https://example.org/archive/madison-papers",
  description: [
    "This collection consists of a wide array of polling data from Market Opinion Research at the state and local levels for the several presidential primaries and campaigns in which George H. W. Bush was involved. This includes his unsuccessful bid for the Republican presidential nomination in 1980; his election that same year and re-election in 1984 as Ronald Reagan's Vice President; his election as President in 1988; and his unsuccessful re-election bid in 1992.",
    "In addition, polling data related to issues of concern to the people of the United States are presented including the public's perceptions of the President's job performance, the general state of the Union, the economy, reactions to candidate/presidential speeches, crime, drugs, health care, education, taxation, the Federal budget deficit, Iran-Contra, and the Persian Gulf crisis and ensuing war.",
    "The holdings also contain studies of the media treatment of President Bush, debate preparation materials, reports on issues of local importance throughout the United States, talking points for Republican operatives, and campaign trip schedules for President George H. W. Bush and Vice President Dan Quayle."
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
