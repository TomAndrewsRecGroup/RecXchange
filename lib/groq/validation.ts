/**
 * Input Validation and Sanitization for Groq AI Chat
 * 
 * This module provides security functions to validate and sanitize all user inputs
 * before they reach the AI or database. This prevents injection attacks, XSS,
 * and other security vulnerabilities.
 */

import { UserPersona } from './config';

/**
 * Maximum allowed lengths for user inputs
 */
const MAX_LENGTHS = {
  name: 100,
  email: 254, // RFC 5321
  message: 2000,
  companyName: 200,
  pageContext: 100,
} as const;

/**
 * Patterns that indicate potential security threats
 */
const SUSPICIOUS_PATTERNS = [
  /<script/gi,
  /javascript:/gi,
  /onerror=/gi,
  /onclick=/gi,
  /<iframe/gi,
  /eval\(/gi,
  /expression\(/gi,
] as const;

/**
 * SQL injection patterns to detect
 */
const SQL_INJECTION_PATTERNS = [
  /('|(\-\-)|(;)|(\|\|)|(\*))/gi,
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
] as const;

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: string;
}

/**
 * Sanitize a string by removing potentially dangerous characters
 */
export function sanitizeString(input: string, maxLength: number): string {
  if (!input) return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>"']/g, '') // Remove HTML special chars
    .replace(/\r?\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' '); // Collapse multiple spaces
}

/**
 * Check if string contains suspicious patterns
 */
export function containsSuspiciousContent(input: string): boolean {
  const lowerInput = input.toLowerCase();
  
  // Check for XSS patterns
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(lowerInput)) {
      return true;
    }
  }
  
  // Check for SQL injection patterns
  for (const pattern of SQL_INJECTION_PATTERNS) {
    if (pattern.test(lowerInput)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  
  const trimmed = email.trim();
  
  if (trimmed.length > MAX_LENGTHS.email) {
    return { valid: false, error: 'Email is too long' };
  }
  
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  if (containsSuspiciousContent(trimmed)) {
    return { valid: false, error: 'Email contains invalid characters' };
  }
  
  return { valid: true, sanitized: trimmed.toLowerCase() };
}

/**
 * Validate name input
 */
export function validateName(name: string): ValidationResult {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Name cannot be empty' };
  }
  
  if (trimmed.length > MAX_LENGTHS.name) {
    return { valid: false, error: 'Name is too long' };
  }
  
  if (containsSuspiciousContent(trimmed)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }
  
  // Only allow letters, spaces, hyphens, and apostrophes
  if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }
  
  return { valid: true, sanitized: sanitizeString(trimmed, MAX_LENGTHS.name) };
}

/**
 * Validate message input
 */
export function validateMessage(message: string): ValidationResult {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message is required' };
  }
  
  const trimmed = message.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Message cannot be empty' };
  }
  
  if (trimmed.length > MAX_LENGTHS.message) {
    return { valid: false, error: 'Message is too long (max 2000 characters)' };
  }
  
  if (containsSuspiciousContent(trimmed)) {
    return { valid: false, error: 'Message contains suspicious content' };
  }
  
  return { valid: true, sanitized: trimmed };
}

/**
 * Validate company name
 */
export function validateCompanyName(companyName: string | undefined): ValidationResult {
  if (!companyName) {
    return { valid: true, sanitized: '' };
  }
  
  if (typeof companyName !== 'string') {
    return { valid: false, error: 'Invalid company name format' };
  }
  
  const trimmed = companyName.trim();
  
  if (trimmed.length > MAX_LENGTHS.companyName) {
    return { valid: false, error: 'Company name is too long' };
  }
  
  if (containsSuspiciousContent(trimmed)) {
    return { valid: false, error: 'Company name contains invalid characters' };
  }
  
  return { valid: true, sanitized: sanitizeString(trimmed, MAX_LENGTHS.companyName) };
}

/**
 * Validate persona input
 */
export function validatePersona(persona: string): ValidationResult {
  if (!persona || typeof persona !== 'string') {
    return { valid: false, error: 'Persona is required' };
  }
  
  const validPersonas: UserPersona[] = ['recruiter', 'hiring-manager'];
  
  if (!validPersonas.includes(persona as UserPersona)) {
    return { valid: false, error: 'Invalid persona type' };
  }
  
  return { valid: true, sanitized: persona as UserPersona };
}

/**
 * Validate page context
 */
export function validatePageContext(pageContext: string | undefined): ValidationResult {
  if (!pageContext) {
    return { valid: true, sanitized: 'Homepage' };
  }
  
  if (typeof pageContext !== 'string') {
    return { valid: false, error: 'Invalid page context format' };
  }
  
  const trimmed = pageContext.trim();
  
  if (trimmed.length > MAX_LENGTHS.pageContext) {
    return { valid: false, error: 'Page context is too long' };
  }
  
  return { valid: true, sanitized: sanitizeString(trimmed, MAX_LENGTHS.pageContext) };
}

/**
 * Validate all chat inputs at once
 */
export interface ChatInputs {
  name?: string;
  email?: string;
  message: string;
  persona?: string;
  companyName?: string;
  pageContext?: string;
}

export interface ValidatedChatInputs {
  name?: string;
  email?: string;
  message: string;
  persona?: UserPersona;
  companyName?: string;
  pageContext: string;
}

export function validateChatInputs(
  inputs: ChatInputs,
  isFirstMessage: boolean
): { valid: boolean; error?: string; data?: ValidatedChatInputs } {
  // Message is always required
  const messageValidation = validateMessage(inputs.message);
  if (!messageValidation.valid) {
    return { valid: false, error: messageValidation.error };
  }
  
  // For first message, require name, email, and persona
  if (isFirstMessage) {
    if (!inputs.name || !inputs.email || !inputs.persona) {
      return { valid: false, error: 'Name, email and persona required for first message' };
    }
    
    const nameValidation = validateName(inputs.name);
    if (!nameValidation.valid) {
      return { valid: false, error: nameValidation.error };
    }
    
    const emailValidation = validateEmail(inputs.email);
    if (!emailValidation.valid) {
      return { valid: false, error: emailValidation.error };
    }
    
    const personaValidation = validatePersona(inputs.persona);
    if (!personaValidation.valid) {
      return { valid: false, error: personaValidation.error };
    }
    
    const companyValidation = validateCompanyName(inputs.companyName);
    if (!companyValidation.valid) {
      return { valid: false, error: companyValidation.error };
    }
    
    const pageContextValidation = validatePageContext(inputs.pageContext);
    if (!pageContextValidation.valid) {
      return { valid: false, error: pageContextValidation.error };
    }
    
    return {
      valid: true,
      data: {
        name: nameValidation.sanitized,
        email: emailValidation.sanitized,
        message: messageValidation.sanitized!,
        persona: personaValidation.sanitized as UserPersona,
        companyName: companyValidation.sanitized,
        pageContext: pageContextValidation.sanitized!,
      },
    };
  }
  
  // For subsequent messages, only message is required
  const pageContextValidation = validatePageContext(inputs.pageContext);
  if (!pageContextValidation.valid) {
    return { valid: false, error: pageContextValidation.error };
  }
  
  return {
    valid: true,
    data: {
      message: messageValidation.sanitized!,
      pageContext: pageContextValidation.sanitized!,
    },
  };
}
