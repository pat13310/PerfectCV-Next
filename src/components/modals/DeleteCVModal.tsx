'use client';

import { Button } from '@/components/ui/PrimaryButton';

interface DeleteCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cvName: string;
}

export default function DeleteCVModal({
  isOpen,
  onClose,
  onConfirm,
  cvName,
}: DeleteCVModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Supprimer le CV</h2>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer le CV &quot;{cvName}&quot; ? Cette action est irréversible.
        </p>
        
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
}
