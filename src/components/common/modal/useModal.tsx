import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled, { DefaultTheme, StyledComponentProps } from 'styled-components';
import { HEADER_HEIGHT } from 'constants/style';

type StyledModalProps = StyledComponentProps<
  ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>,
  DefaultTheme,
  // eslint-disable-next-line
  {},
  never
>;

interface StyledModalDivProps {
  overflowY?: string;
  aboveFooter?: boolean;
}

const StyledModal = styled(motion.div)<StyledModalDivProps>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 90%;
  width: 90%;
  margin-top: ${HEADER_HEIGHT};
  z-index: 100;

  overflow-y: ${(props) => props.overflowY || 'auto'};
`;

interface BackgroundProps {
  isOpen?: boolean;
  aboveFooter?: boolean;
}

const Background = styled.div<BackgroundProps>`
  position: fixed;
  background: rgba(205, 205, 205, 0.6); // so it matches the header
  backdrop-filter: blur(4px);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 100;

  transition: opacity 150ms linear;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
`;

export interface UseModalResult {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  onModalOutsideClick: React.MouseEventHandler<HTMLDivElement>;
  modalRef: React.RefObject<HTMLDivElement>;
}

interface UseModalOptions {
  isOpen?: boolean;
}

const useModal = (options?: UseModalOptions): UseModalResult => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(options?.isOpen || false);
  const openModal = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeModal = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen, setIsOpen]);

  const toggleModal = useCallback(() => setIsOpen(!isOpen), [setIsOpen, isOpen]);
  const onModalOutsideClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ target }: any) => {
      const clickingOutsideModal =
        modalRef && modalRef.current && !modalRef.current.contains(target);

      if (isOpen && clickingOutsideModal) closeModal();
    },
    [modalRef, isOpen, closeModal],
  );

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    onModalOutsideClick,
    modalRef,
  };
};

export type ModalProps = StyledModalProps &
  BackgroundProps & {
    onModalOutsideClick: React.MouseEventHandler<HTMLDivElement>;
  };

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onModalOutsideClick, ...rest }: ModalProps, ref) => {
    useEffect(() => {
      // prevents background scrolling when the modal is open
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    const escFunction = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: any) => {
        if (event.key === 'Escape') {
          onModalOutsideClick(event);
        }
      },
      [onModalOutsideClick],
    );

    useEffect(() => {
      document.addEventListener('keydown', escFunction, false);

      return () => {
        document.removeEventListener('keydown', escFunction, false);
      };
    }, [escFunction]);

    const variants: HTMLMotionProps<'div'>['variants'] = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };

    return (
      <Background isOpen={isOpen} onClick={onModalOutsideClick}>
        {isOpen && (
          <StyledModal
            {...rest}
            ref={ref}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.4 }}
          />
        )}
      </Background>
    );
  },
);

export default useModal;
