import { request } from './auth';

export interface ContactSubmission {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  employeeRange?: string;
  requirements: string;
  consent: boolean;
}

export async function submitContact(payload: ContactSubmission): Promise<void> {
  await request<void>('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
