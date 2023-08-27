import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import { Component } from 'react';
import { Modal } from '../Modal/Modal';
export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    console.log('hoho');
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { id, webformatURL, tags, largeImageURL } = this.props.props;
    const showModal = this.state.showModal;
    return (
      <>
        <GalleryItem data-id={id} onClick={this.toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} data-id={id} />
        </GalleryItem>
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            alt={tags}
          />
        )}
      </>
    );
  }
}
