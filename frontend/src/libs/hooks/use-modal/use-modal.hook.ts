import { useCallback, useState } from '~/libs/hooks/hooks.js';

type modalFormHookProperties = {
  isOpenModal: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
};

const useModal = (): modalFormHookProperties => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return { isOpenModal, handleModalOpen, handleModalClose };
};

export { useModal };
