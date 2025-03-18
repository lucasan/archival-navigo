
import React from 'react';
import SeriesSection from '../SeriesSection';
import FileUnitNode from '../FileUnitNode';
import ItemNode from '../ItemNode';
import { FileUnitStatus } from '../types';

interface ScienceTechnologyCollectionProps {
  searchTerm: string;
  statusFilter: 'all' | FileUnitStatus;
}

const ScienceTechnologyCollection: React.FC<ScienceTechnologyCollectionProps> = ({ 
  searchTerm, 
  statusFilter 
}) => {
  return (
    <>
      <div id="science-technology" className="font-bold text-base sm:text-lg mt-8 mb-2">
        GB-SCT: Records of the White House Office of Science and Technology (George H. W. Bush Administration)
      </div>
      
      <SeriesSection
        id="allan-bromley"
        title="Allan D. Bromley's Subject Files"
        description="Subject files maintained by Allan D. Bromley, Science Advisor to the President and Director of the Office of Science and Technology Policy."
        extent="8 linear feet (19 boxes)"
        arrangement="Alphabetical by subject"
        date="1989-1993"
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        hideMetadata={true}
      >
        <FileUnitNode 
          title="International - Russia [1990]" 
          status="open"
          naid="285792187"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="US-Russia Scientific Exchange Proposal" 
            thumbnailUrl="/placeholder.svg" 
            naid="285792188"
            scopeContent="Draft proposal for a bilateral scientific exchange program between the United States and Russia following the fall of the Soviet Union. Details funding mechanisms, research priorities, and implementation timeline."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Moscow Meeting Briefing Papers" 
            thumbnailUrl="/placeholder.svg" 
            naid="285792189"
            scopeContent="Confidential briefing papers prepared for Dr. Bromley's meeting with Russian science officials in Moscow, December 1990. Includes talking points, intelligence assessments, and policy objectives."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="International: Japan [2 of 3] [1991]" 
          status="digitized"
          naid="285792157"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="Japan-US Science and Technology Agreement" 
            thumbnailUrl="/placeholder.svg" 
            naid="285792158"
            scopeContent="Official text of the revised bilateral Science and Technology Agreement signed in 1991, with annotations by Bromley highlighting changes from the previous version and implementation challenges."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Technology Transfer Issues" 
            thumbnailUrl="/placeholder.svg" 
            naid="285792159"
            scopeContent="Analysis of sensitive technology transfer issues between the US and Japan, focusing on semiconductor research, supercomputing, and aerospace technologies. Includes Department of Defense concerns."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
        
        <FileUnitNode 
          title="International Countries, White House: Japan [1992]" 
          status="closed"
          naid="285792161"
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        >
          <ItemNode 
            title="High-Energy Physics Collaboration Proposal" 
            thumbnailUrl="/placeholder.svg" 
            naid="285792162"
            scopeContent="Proposal for joint funding and research on high-energy physics between US and Japanese laboratories, including budget projections, facility sharing arrangements, and intellectual property provisions."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Tokyo Summit Science Agenda" 
            thumbnailUrl="/placeholder.svg" 
            naid="285792163"
            scopeContent="Draft science and technology agenda for the 1992 G7 Tokyo Summit, with emphasis on climate change research, human genome project coordination, and global internet infrastructure development."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
          <ItemNode 
            title="Bilateral Research Initiative Funding" 
            thumbnailUrl="/placeholder.svg" 
            naid="285792164"
            scopeContent="Budget allocation documents and funding agreements for joint US-Japan research initiatives in biotechnology, robotics, and materials science, with detailed breakdowns of financial commitments from both countries."
            searchTerm={searchTerm}
            statusFilter={statusFilter}
          />
        </FileUnitNode>
      </SeriesSection>
    </>
  );
};

export default ScienceTechnologyCollection;
