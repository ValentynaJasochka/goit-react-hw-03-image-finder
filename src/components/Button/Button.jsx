import { ButtonStyle, Wrapper } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClickRender }) => (
  <Wrapper>
    <ButtonStyle type="button" onClick={onClickRender}>
      Load more
    </ButtonStyle>
  </Wrapper>
);

Button.propTypes = {
  onClickRender: PropTypes.func.isRequired,
};
