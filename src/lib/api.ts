import type { CV } from '@/types/cv';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  details?: string;
}

export async function getCVData(id: string): Promise<ApiResponse<CV>> {
  try {
    const response = await fetch(`/api/cv/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data.error || 'Failed to fetch CV data',
        details: data.details,
      };
    }

    return data as ApiResponse<CV>;
  } catch (error) {
    return {
      data: null,
      error: 'Failed to fetch CV data',
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
