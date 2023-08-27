import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';

import { fetchPhoto, onFetchError } from './fetchApi';

import { Button } from './Button/Button';

const perPage = 12;
export class App extends Component {
  state = {
    search: '',
    photos: [],
    page: 1,
    status: 'idle',
    btnLoadMore: false,
  };

  handleFormSummit = async searchValue => {
    const { page } = this.state;
    try {
      this.setState({ status: 'pending' });
      const { hits } = await fetchPhoto(searchValue, page, perPage);
      if (!hits.length) {
        this.setState({ status: 'idle' });
        toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        console.log('RENDER NEWSEARCH');
        const arrPhotos = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            largeImageURL,
            tags,
            webformatURL,
          })
        );
        this.setState({
          search: searchValue,
          page: 1,
          photos: arrPhotos,
          btnLoadMore: true,
          status: 'resolved',
        });
      }
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  componentDidUpdate = async (_, prevState) => {
    const { page: prevPage, search: prevSearch } = prevState;
    const { page: newPage, search } = this.state;

    if (prevPage !== newPage && prevSearch === search) {
      this.setState({ status: 'pending' });
      try {
        console.log('RENDER NEWPAGE');
        const { totalHits, hits } = await fetchPhoto(search, newPage, perPage);
        const totalPage = Math.ceil(totalHits / perPage);
        if (totalPage < newPage) {
          this.setState({ btnLoadMore: false });
        }
        const arrPhotos = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            largeImageURL,
            tags,
            webformatURL,
          })
        );
        this.setState(prevState => ({
          photos: [...prevState.photos, ...arrPhotos],
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };
  onClickLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { photos, status, btnLoadMore } = this.state;
    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSummit} />
          <ToastContainer autoClose={2000} position="top-center" />
        </>
      );
    }
    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSummit} />
          <Loader />
        </>
      );
    }
    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSummit} />
          <ToastContainer autoClose={2000} position="top-center" />
          {onFetchError()}
        </>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSummit} />
          <ToastContainer autoClose={2000} position="top-center" />
          <ImageGallery photos={photos} />
          {btnLoadMore && <Button onClickRender={this.onClickLoadMore} />}
        </>
      );
    }
  }
}
