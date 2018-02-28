import styled from 'styled-components';

import Container from 'components/form/container';
import Errors from 'components/form/errors';
import HeaderContainer from 'components/form/header-container';
import Input from 'components/form/input';
import Label from 'components/form/label';
import Submit from 'components/form/submit';
import Subtitle from 'components/form/subtitle';
import Title from 'components/form/title';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

Form.Container = Container;
Form.Errors = Errors;
Form.HeaderContainer = HeaderContainer;
Form.Input = Input;
Form.Label = Label;
Form.Submit = Submit;
Form.Subtitle = Subtitle;
Form.Title = Title;

export default Form;
