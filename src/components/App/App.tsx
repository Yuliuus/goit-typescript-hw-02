import { useState, useEffect } from "react";
import { fetchPictures } from "../../pictures-api";
import { ImageDataType } from "../ImageCard/Image.types";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ImageGallery from "../ImageGallery/ImageGallery";
import css from "./App.module.css";

function App() {
  const [pictures, setPictures] = useState<ImageDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageDataType | null>(
    null
  );

  const handleSearch = async (newTopic: string): Promise<void> => {
    setPictures([]);
    setPage(1);
    setTopic(newTopic);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const handleOpenModal = (item: ImageDataType): void => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (topic === "") {
      return;
    }

    async function getPictures(): Promise<void> {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchPictures(topic, page);
        setPictures((prevPictures) => {
          return [...prevPictures, ...data.results];
        });
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getPictures();
  }, [topic, page]);

  return (
    <>
      <div className={css.galleryWrap}>
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Loading, please wait</p>}
        {error && <p>Oops! It seems like the page need to be reloaded</p>}
        {pictures.length > 0 && (
          <ImageGallery items={pictures} onModalOpen={handleOpenModal} />
        )}
        {pictures.length > 0 && !loading && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </div>
      <ImageModal
        item={selectedImage}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </>
  );
}

export default App;
