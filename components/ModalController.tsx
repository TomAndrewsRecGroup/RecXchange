'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import SendRolesForm from './send-roles-form';
import RecXDirectForm from './recx-direct-form';
import HowItWorksForm from './how-it-works-form';

/**
 * ModalController watches URL params and opens modals accordingly.
 * Used for AI chat "smart links" that open modals with prefilled data.
 * 
 * Supported actions:
 * - send-3-roles: Opens SendRolesForm with prefilled name/email/industries
 * - recx-direct-info: Opens RecXDirectForm with prefilled name/email/industries
 * - how-it-works: Opens HowItWorksForm with prefilled name/email/company/industries
 * 
 * Example URLs:
 * - /?action=send-3-roles&name=Tom&email=tom@example.com&industries=tech,finance
 * - /?action=recx-direct-info&name=Tom&email=tom@example.com
 * - /?action=how-it-works&name=Tom&email=tom@example.com&company=Acme&bookedMeeting=true
 */
export default function ModalController() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [modalState, setModalState] = useState<{
    action: string | null;
    data: Record<string, any>;
  }>({ action: null, data: {} });

  useEffect(() => {
    const action = searchParams.get('action');
    
    if (action === 'send-3-roles' || action === 'recx-direct-info' || action === 'how-it-works') {
      // Parse URL params
      const name = searchParams.get('name') || '';
      const email = searchParams.get('email') || '';
      const company = searchParams.get('company') || '';
      const industriesParam = searchParams.get('industries') || '';
      const bookedMeeting = searchParams.get('bookedMeeting') === 'true';
      
      // Parse industries (comma-separated)
      const industries = industriesParam
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);

      setModalState({
        action,
        data: { name, email, company, industries, bookedMeeting }
      });
    }
  }, [searchParams]);

  const handleClose = () => {
    // Clear modal state
    setModalState({ action: null, data: {} });
    
    // Clear URL params by navigating to clean pathname
    router.replace(pathname, { scroll: false });
  };

  // Render appropriate modal based on action
  if (modalState.action === 'send-3-roles') {
    return (
      <SendRolesForm
        isOpen={true}
        onClose={handleClose}
        prefillName={modalState.data.name}
        prefillEmail={modalState.data.email}
        prefillIndustries={modalState.data.industries}
        autoFocus={true}
      />
    );
  }

  if (modalState.action === 'recx-direct-info') {
    return (
      <RecXDirectForm
        isOpen={true}
        onClose={handleClose}
        prefillName={modalState.data.name}
        prefillEmail={modalState.data.email}
        prefillIndustries={modalState.data.industries}
        autoFocus={true}
      />
    );
  }

  if (modalState.action === 'how-it-works') {
    return (
      <HowItWorksForm
        isOpen={true}
        onClose={handleClose}
        prefillName={modalState.data.name}
        prefillEmail={modalState.data.email}
        prefillCompany={modalState.data.company}
        prefillIndustries={modalState.data.industries}
        bookedMeeting={modalState.data.bookedMeeting}
        autoFocus={true}
      />
    );
  }

  return null;
}
