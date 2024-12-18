export enum OpenAIErrorType {
  API_KEY_MISSING = 'API_KEY_MISSING',
  API_KEY_INVALID = 'API_KEY_INVALID',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface OpenAIErrorDetails {
  message: string;
  type: OpenAIErrorType;
  details?: string;
  retryable?: boolean;
  userAction?: string;
}

export function handleOpenAIError(error: Error): OpenAIErrorDetails {
  if (error.message.includes('Clé API manquante')) {
    return {
      message: 'Configuration requise',
      type: OpenAIErrorType.API_KEY_MISSING,
      details: 'Veuillez configurer votre clé API OpenAI dans les paramètres.',
      userAction: 'Allez dans Paramètres > API OpenAI et ajoutez votre clé API.'
    };
  }

  if (error.message.includes('401') || error.message.includes('Authentication')) {
    return {
      message: 'Clé API invalide',
      type: OpenAIErrorType.API_KEY_INVALID,
      details: 'Votre clé OpenAI semble incorrecte. Vérifiez et réessayez.',
      userAction: 'Vérifiez votre clé API dans les paramètres et régénérez-la si nécessaire.'
    };
  }

  if (error.message.includes('429') || error.message.includes('Rate limit')) {
    return {
      message: 'Limite de requêtes dépassée',
      type: OpenAIErrorType.RATE_LIMIT_EXCEEDED,
      details: 'Trop de requêtes ont été envoyées. Patientez quelques minutes.',
      userAction: 'Attendez quelques minutes avant de réessayer ou vérifiez votre forfait API.'
    };
  }

  if (error.message.includes('network') || error.message.includes('fetch')) {
    return {
      message: 'Erreur de connexion',
      type: OpenAIErrorType.NETWORK_ERROR,
      details: 'Problème de réseau. Vérifiez votre connexion internet.',
      userAction: 'Vérifiez votre connexion internet et réessayez.'
    };
  }

  return {
    message: 'Erreur OpenAI',
    type: OpenAIErrorType.UNKNOWN_ERROR,
    details: error.message || 'Une erreur inattendue est survenue.',
    userAction: 'Réessayez ultérieurement ou contactez le support.'
  };
}
