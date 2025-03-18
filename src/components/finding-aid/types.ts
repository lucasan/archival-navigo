
export type FileUnitStatus = 'open' | 'closed' | 'digitized';

export interface TreeNodeBase {
  title: string;
  type: 'series' | 'container' | 'file-unit' | 'item';
  isDigitized?: boolean;
  children?: React.ReactNode;
  thumbnailUrl?: string;
  externalUrl?: string;
  level?: number;
  searchTerm?: string;
  statusFilter?: FileUnitStatus | 'all';
  isVisible?: boolean;
}

export interface SeriesNodeProps extends TreeNodeBase {
  type: 'series';
  seriesDescription?: string;
  seriesExtent?: string;
  seriesArrangement?: string;
  seriesDate?: string;
  seriesAccessRestriction?: string;
  seriesSpecificAccessRestriction?: string;
  seriesUseRestriction?: string;
  seriesSpecificUseRestriction?: string;
}

export interface ContainerNodeProps extends TreeNodeBase {
  type: 'container';
  containerNumber?: string;
  containerType?: string;
}

export interface FileUnitNodeProps extends TreeNodeBase {
  type: 'file-unit';
  fileUnitStatus?: FileUnitStatus;
  naid?: string;
  containerId?: string;
}

export interface ItemNodeProps extends TreeNodeBase {
  type: 'item';
}

export type TreeNodeProps = SeriesNodeProps | ContainerNodeProps | FileUnitNodeProps | ItemNodeProps;
