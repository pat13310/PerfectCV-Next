export const sanitize = (input: string | undefined, maxLength = 200): string => {
  if (!input) return '';
  return input
    .toString()
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);
};

export const extractName = (fullName?: string) => {
  if (!fullName) return { firstName: '', lastName: '' };
  const parts = sanitize(fullName).split(/\s+/);
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || ''
  };
};

export const extractEmail = (text?: string): string => {
  if (!text) return '';
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = sanitize(text).match(emailRegex);
  return match ? match[0] : '';
};

export const extractPhone = (text?: string): string => {
  if (!text) return '';
  const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}|\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}/;
  const match = sanitize(text).match(phoneRegex);
  return match ? match[0].replace(/[^\d+]/g, '') : '';
};
