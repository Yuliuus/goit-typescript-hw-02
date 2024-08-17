import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { ImageDataType } from "../ImageCard/Image.types";

type ImageGalleryProps = {
  items: ImageDataType[];
  onModalOpen: (item: ImageDataType) => void;
};

export default function ImageGallery({
  items,
  onModalOpen,
}: ImageGalleryProps) {
  return (
    <ul className={css.gallery}>
      {items.map((item) => (
        <li className={css.galleryItem} key={item.id}>
          <div>
            <ImageCard item={item} onModalOpen={onModalOpen} />
          </div>
        </li>
      ))}
    </ul>
  );
}
