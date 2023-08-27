import axios from 'axios';
import { toast } from 'react-toastify';

const KEY = '38351175-155fd4149cf6b138ffaa93d1f';
const URL = 'https://pixabay.com/api/';

export async function fetchPhoto(search, page, perPage) {
  const url = `${URL}?key=${KEY}&q=${search}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`;
  const response = await axios.get(url);
  return response.data;
}

export function onFetchError() {
  toast.error(
    'Oops! Something went wrong! Try reloading the page or make another choice!'
  );
}
