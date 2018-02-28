import React from 'react';

import { mount } from 'enzyme';

import ShiftCreationModal from 'components/shift-creation-modal';
import CreateButton from 'components/shift-creation-modal/create-button';
import Modal from 'components/shift-creation-modal/modal';
import TimeInput from 'components/shift-creation-modal/time-input';
import { format, setHours } from 'models/time';
import { User } from 'spec/factories';

const mountComponent = (props) => mount((
  <ShiftCreationModal
    day={new Date(Date.UTC(2018, 11, 25))}
    dismissModal={() => {}}
    onAddShift={() => {}}
    user={new User()}
    visible={false}
    x={0}
    y={0}
    {...props}
  />
));

describe('<ShiftCreationModal />', () => {
  describe('when not visible', () => {
    it('renders null', () => {
      const wrapper = mountComponent({
        visible: false,
      });

      expect(wrapper.children().exists()).toEqual(false);
    });
  });

  describe('when visible', () => {
    it('displays the Modal', () => {
      const wrapper = mountComponent({
        visible: true,
      });

      expect(wrapper.contains(Modal)).toEqual(true);
    });

    describe('when invalid times are entered', () => {
      const setup = (props) => {
        const wrapper = mountComponent({
          visible: true,
          ...props,
        });

        wrapper.find(TimeInput).props().onChange({
          currentTarget: {
            value: 'not a time',
          },
        });

        wrapper.find(CreateButton).simulate('mouseenter');

        return wrapper;
      };

      it('keeps the create button disabled', () => {
        const wrapper = setup();
        expect(wrapper.find(CreateButton).props().disabled).toEqual(true);
      });

      it('clears out the input', () => {
        const wrapper = setup();
        expect(wrapper.find(TimeInput).props().value).toEqual('');
      });
    });

    describe('when valid times are entered', () => {
      const setup = (props) => {
        const wrapper = mountComponent({
          visible: true,
          ...props,
        });

        wrapper.find(TimeInput).props().onChange({
          currentTarget: {
            value: '9a - 5p',
          },
        });

        wrapper.find(CreateButton).simulate('mouseenter');

        return wrapper;
      };

      it('enables the create button', () => {
        const wrapper = setup();
        expect(wrapper.find(CreateButton).props().disabled).toEqual(false);
      });

      describe('when creating the shift', () => {
        it('calls createShift()', () => {
          const result = {};
          const createShift = jest.fn().mockReturnValue(Promise.resolve(result));
          const day = new Date(Date.UTC(2018, 11, 25));
          const user = new User();
          const wrapper = setup({
            createShift,
            day,
            user,
          });

          wrapper.find(CreateButton).simulate('click');

          expect(createShift).toHaveBeenCalledTimes(1);
          expect(createShift).toHaveBeenCalledWith(user, {
            endTime: format.forServer(setHours(day, 17)),
            startTime: format.forServer(setHours(day, 9)),
          });
        });
      });
    });
  });
});
