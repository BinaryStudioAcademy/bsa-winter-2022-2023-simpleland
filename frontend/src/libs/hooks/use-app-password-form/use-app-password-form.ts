import { useCallback, useState } from '~/libs/hooks/hooks.js';

type UsePasswordForm = () => {
  isOpenPasswordModal: boolean;
  handlePasswordModalOpen: () => void;
  handlePasswordModalClose: () => void;
};

const UsePasswordForm: UsePasswordForm = () => {
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);

  const handlePasswordModalOpen = useCallback(() => {
    setIsOpenPasswordModal(true);
  }, []);

  const handlePasswordModalClose = useCallback(() => {
    setIsOpenPasswordModal(false);
  }, []);

  return {
    isOpenPasswordModal,
    handlePasswordModalOpen,
    handlePasswordModalClose,
  };
};

export { UsePasswordForm };
