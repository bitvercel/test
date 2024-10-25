export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface StakeholderType {
  id: string;
  name: string;
  fields: StakeholderField[];
}

export interface StakeholderField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'email' | 'phone' | 'date';
  required: boolean;
}

export interface Stakeholder {
  id: string;
  typeId: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}