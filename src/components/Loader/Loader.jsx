import { TailSpin } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <>
      <TailSpin
        height="180"
        width="180"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
};
