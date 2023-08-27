import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ photos }) => {
  return (
    <Gallery>
      {photos.map(photo => (
        <ImageGalleryItem key={photo.id} props={photo} />
      ))}
    </Gallery>
  );
};
