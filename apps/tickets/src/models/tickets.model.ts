export interface TicketResponse {
  status: 'success' | 'error';
  tickets: { [key: string]: TicketDetails };
}

export interface TicketMessagesResponse {
  status: 'success' | 'error';
  messages: MessageDetails[];
}

export interface TicketDetails {
  assignee: number;
  category: number | string;
  created: number;
  creator: number | string;
  description: string;
  id: number;
  last_edit: number;
  name: string;
  open: number;
  priority: number;
  status?: number | string;
}

export interface MessageDetails {
  id?: number;
  last_edit?: number;
  message?: string;
  posted?: number;
  ticket?: number;
  user?: number;
}
