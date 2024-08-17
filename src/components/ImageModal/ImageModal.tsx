import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { ImageDataType } from "../ImageCard/Image.types";
Modal.setAppElement("#root");

type ModalProps = {
  item: ImageDataType | null;
  isOpen: boolean;
  onRequestClose: () => void;
};

export default function ImageModal({
  item,
  isOpen,
  onRequestClose,
}: ModalProps) {
  if (!item) {
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={css.overlay}
    >
      {isOpen && (
        <>
          <img
            src={item.urls.regular}
            alt={item.alt_description}
            className={css.img}
          />
        </>
      )}
    </Modal>
  );
}
