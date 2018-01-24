import styled from 'styled-components';

import Container from 'components/Form/Container';
import Errors from 'components/Form/Errors';
import HeaderContainer from 'components/Form/HeaderContainer';
import Input from 'components/Form/Input';
import Label from 'components/Form/Label';
import Submit from 'components/Form/Submit';
import Subtitle from 'components/Form/Subtitle';
import Title from 'components/Form/Title';

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
