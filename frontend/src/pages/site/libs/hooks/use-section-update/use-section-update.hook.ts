import {
  type FieldValues,
  type UseFormHandleSubmit,
  type UseFormReset,
} from 'react-hook-form';

import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';

type ReturnValue = {
  isEditing: boolean;
  handleEditingStart: () => void;
  handleSectionUpdate: () => void;
};

type Parameters<T extends FieldValues = FieldValues> = {
  onUpdate: (payload: T) => void;
  handleSubmit: UseFormHandleSubmit<T>;
  handleReset: UseFormReset<T>;
};

const useSectionUpdate = <T extends FieldValues = FieldValues>({
  onUpdate,
  handleSubmit,
  handleReset,
}: Parameters<T>): ReturnValue => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEditingStart = useCallback((): void => {
    setIsEditing(true);
  }, [setIsEditing]);

  const handleSectionUpdate = useCallback(() => {
    void handleSubmit(onUpdate, () => {
      handleReset();
    })();
    setIsEditing(false);
  }, [handleSubmit, onUpdate, handleReset]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleSectionUpdate();
        setIsEditing(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsEditing, handleSectionUpdate]);

  return { isEditing, handleEditingStart, handleSectionUpdate };
};

export { useSectionUpdate };
