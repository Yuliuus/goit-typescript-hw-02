import css from "./ImageCard.module.css";
import { ImageDataType } from "../ImageCard/Image.types";

type ImageCardProps = {
  item: ImageDataType;
  onModalOpen: (item: ImageDataType) => void;
};

export default function ImageCard({ item, onModalOpen }: ImageCardProps) {
  const { urls, alt_description } = item;

  return (
    <div className={css.imageContainer}>
      <img
        className={css.img}
        src={urls.small}
        alt={alt_description}
        onClick={() => onModalOpen(item)}
      />
    </div>
  );
}
