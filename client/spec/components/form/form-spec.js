import React from 'react';
import Validation from 'models/validations/validation';
import { Button } from 'components/style';
import { Errors, Form, Input } from 'components/form';
import { mount } from 'spec/support/mount';

const FIELDS = [
  {
    initialValue: '',
    name: 'name',
    validation: new Validation([({ name }) => name.length === 0 ? 'Must be present' : null]),
  },
  {
    initialValue: 'Some Title',
    name: 'title',
  },
];

function TestForm(props) {
  return (
    <Form
      fields={FIELDS}
      onSubmit={() => {}}
      {...props}
    >
      {({ errorPropsForField, inputPropsForField, submitProps }) => (
        <>
          <Input placeholder="Name" {...inputPropsForField('name')} />
          <Errors {...errorPropsForField('name')} />
          <Input placeholder="Title" {...inputPropsForField('title')} />
          <Errors {...errorPropsForField('title')} />
          <Button {...submitProps}>Submit</Button>
        </>
      )}
    </Form>
  );
}

describe('<Form />', () => {
  it('handles initial values', () => {
    const { getByPlaceholderText } = mount(<TestForm />);

    expect(getByPlaceholderText('Title').value).toEqual('Some Title');
  });

  describe('before any blurs', () => {
    it('shows no errors', () => {
      const { enterValue, getByPlaceholderText, queryByText } = mount(<TestForm />);

      enterValue(getByPlaceholderText('Name'), 'Kyle');

      expect(getByPlaceholderText('Name').value).toEqual('Kyle');
      expect(queryByText('Must be present')).toBeNull();
    });
  });

  describe('after blur', () => {
    describe('when the validations fail', () => {
      it('shows errors', () => {
        const { blur, enterValue, getByPlaceholderText, getByText, queryByText } = mount(<TestForm />);

        blur(getByPlaceholderText('Name'));

        getByText('Must be present');

        enterValue(getByPlaceholderText('Name'), 'Kyle');

        expect(getByPlaceholderText('Name').value).toEqual('Kyle');
        expect(queryByText('Must be present')).toBeNull();
      });
    });

    describe('when the validations do not fail', () => {
      it('shows errors', () => {
        const { blur, enterValue, getByPlaceholderText, queryByText } = mount(<TestForm />);

        enterValue(getByPlaceholderText('Name'), 'Kyle');
        blur(getByPlaceholderText('Name'));

        expect(queryByText('Must be present')).toBeNull();
      });
    });
  });

  describe('when the form is not in a valid state', () => {
    it('does not call the onSubmit callback', () => {
      const onSubmit = jest.fn();
      const { getByText, click } = mount(<TestForm onSubmit={onSubmit} />);

      click(getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledTimes(0);
      getByText('Must be present');
    });
  });

  describe('when the form is in a valid state', () => {
    it('does not call the onSubmit callback', () => {
      const onSubmit = jest.fn();
      const { enterValue, getByPlaceholderText, getByText, click } = mount(<TestForm onSubmit={onSubmit} />);

      enterValue(getByPlaceholderText('Name'), 'Kyle');

      click(getByText('Submit'));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Kyle',
        title: 'Some Title',
      });
    });
  });

  describe('when there are server errors', () => {
    it('includes them in the field errors', () => {
      const { getByText } = mount(<TestForm serverErrors={{ name: ['some server error about the name'] }} />);

      getByText('some server error about the name');
    });
  });
});
