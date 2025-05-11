import { useEffect, useState } from 'react';
import Form from '../components/Form/Form';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Loader from '../components/Loader/Loader';
import Text from '../components/Text/Text';
import Button from '../components/Button/Button';
import { getPhotos } from '../apiService/photos';

const Photos = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!query) return;

    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const data = await getPhotos(query, page);
        setImages(prev => [...prev, ...data.photos]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  return (
    <>
      <Form onSubmit={handleSubmit} />
      {error && <Text textAlign="center">Error: {error}</Text>}
      {images.length === 0 && !isLoading && !error && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
      <PhotosGallery images={images} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore}>Load more</Button>}
    </>
  );
};

export default Photos;
