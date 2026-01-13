const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'https://localhost:54232/api';

interface SignupPayload {
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  fullName?: string;
}

export interface AbnLookupResponse {
  abn: string;
  entityName: string;
  status: string;
}

export async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const data = await response.json();
      if (data?.message) {
        message = data.message;
      } else if (Array.isArray(data?.errors) && data.errors.length > 0) {
        message = data.errors.join(', ');
      }
    }
    catch
    {
      // ignore parsing errors
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('Content-Type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

export async function signup(payload: SignupPayload): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function lookupAbn(abn: string): Promise<AbnLookupResponse> {
  const cleaned = abn.replace(/\D/g, '');
  return request<AbnLookupResponse>(`/abn/${cleaned}`, {
    method: 'GET',
  });
}

export async function signin(payload: { email: string; password: string }): Promise<AuthResponse> {
  return request<AuthResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function resendConfirmation(email: string): Promise<void> {
  await request<void>('/auth/resend-confirmation', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
