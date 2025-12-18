import { request } from './auth';

export interface QuestionnaireSubmission {
  companyName: string;
  abn: string;
  companySize: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  defenceIndustry: string;
  dispMember: string;
  governmentPanels?: string;
  nominatedCso?: string;
  nominatedSo?: string;
  csoNotSure: boolean;
  soNotSure: boolean;
  plan: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPhone: string;
}

export async function submitQuestionnaire(payload: QuestionnaireSubmission): Promise<void> {
  await request<void>('/questionnaires', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface QualificationSubmission {
  abn: string;
  companyName: string;
  companySize: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  defenceIndustry: string;
  dispMember: string;
  governmentPanels?: string;
  nominatedCso?: string;
  nominatedSo?: string;
  csoNotSure: boolean;
  soNotSure: boolean;
}

export async function submitQualification(payload: QualificationSubmission): Promise<void> {
  await request<void>('/questionnaires/qualification', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
