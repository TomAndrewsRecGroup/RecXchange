/**
 * TypeScript type definitions for Groq AI Chat
 * 
 * Centralized types for type safety across the chat system
 */

import { UserPersona, SmartLinkAction } from './config';

/**
 * GHL API message direction
 */
export type MessageDirection = 'inbound' | 'outbound';

/**
 * Conversation message format for Groq API
 */
export interface ConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Smart link data structure
 */
export interface SmartLinkData {
  action: SmartLinkAction;
  prefillData?: {
    name?: string;
    email?: string;
    company?: string;
    industries?: string[];
    bookedMeeting?: boolean;
  };
  url: string;
}

/**
 * Chat API request body
 */
export interface ChatRequestBody {
  name?: string;
  email?: string;
  message: string;
  persona?: UserPersona;
  companyName?: string;
  conversationId?: string;
  contactId?: string;
  pageContext?: string;
}

/**
 * Chat API success response
 */
export interface ChatSuccessResponse {
  success: true;
  contactId: string;
  conversationId: string;
  message: string;
  smartLinks?: SmartLinkData[];
}

/**
 * Chat API error response
 */
export interface ChatErrorResponse {
  error: string;
  message?: string;
}

/**
 * GHL contact payload
 */
export interface GHLContactPayload {
  locationId: string;
  firstName: string;
  lastName: string;
  email: string;
  source: string;
  tags: string[];
  companyName?: string;
}

/**
 * GHL conversation payload
 */
export interface GHLConversationPayload {
  locationId: string;
  contactId: string;
}

/**
 * GHL message payload
 */
export interface GHLMessagePayload {
  type: 'Live_Chat';
  conversationId: string;
  message: string;
}
