import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/PrimaryButton";
import { OpenAIErrorType, OpenAIErrorDetails } from "@/lib/openaiErrors";

interface OpenAIErrorModalProps {
  error: OpenAIErrorDetails | null;
  onClose: () => void;
}

const OpenAIErrorModal: React.FC<OpenAIErrorModalProps> = ({ error, onClose }) => {
  if (!error) return null;

  const getErrorIcon = (type: OpenAIErrorType) => {
    switch (type) {
      case OpenAIErrorType.API_KEY_MISSING:
        return '🔑';
      case OpenAIErrorType.API_KEY_INVALID:
        return '❌';
      case OpenAIErrorType.RATE_LIMIT_EXCEEDED:
        return '⏳';
      case OpenAIErrorType.NETWORK_ERROR:
        return '🌐';
      default:
        return '⚠️';
    }
  };

  return (
    <Dialog open={!!error} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {getErrorIcon(error.type)} Erreur OpenAI
          </DialogTitle>
          <DialogDescription>
            <p className="text-red-600 mb-4">{error.message}</p>
            {error.userAction && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-700">{error.userAction}</p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          {error.type === OpenAIErrorType.API_KEY_MISSING && (
            <Button onClick={() => window.location.href = '/parametres'}>
              Aller aux paramètres
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenAIErrorModal;
