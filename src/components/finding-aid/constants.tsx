
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
      title: "Donor",
      content: (
        <div className="space-y-2">
          <div className="mb-2">
            <a 
              href="https://catalog.archives.gov/id/10573766" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Teeter, Robert M., 1939-2004
            </a>
          </div>
        </div>
      ),
      defaultOpen: true
    }
  ]
};
