'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import SendRolesForm from './send-roles-form';

/**
 * ModalController watches URL params and opens modals accordingly.
 * Used for AI chat "smart links" that open modals with prefilled data.
 * 
 * Example URL: /?action=send-3-roles&name=Tom&email=tom@example.com&industries=tech,finance
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
    
    if (action === 'send-3-roles') {
      // Parse URL params
      const name = searchParams.get('name') || '';
      const email = searchParams.get('email') || '';
      const industriesParam = searchParams.get('industries') || '';
      
      // Parse industries (comma-separated)
      const industries = industriesParam
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);

      setModalState({
        action: 'send-3-roles',
        data: { name, email, industries }
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

  return null;
}
