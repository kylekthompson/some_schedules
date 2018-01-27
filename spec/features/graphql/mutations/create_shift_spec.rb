# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'mutation { createShift }' do
  subject(:mutation) do
    <<~GRAPHQL
      mutation CreateShift($input: CreateShiftInput!) {
        createShift(input: $input) {
          errors
          shift {
            endTime
            published
            startTime
          }
        }
      }
    GRAPHQL
  end

  let(:variables) { { input: { end_time: end_time, start_time: start_time, user_id: user_id } } }
  let(:context) { { current_user: current_user } }
  let(:current_user) { create(:user) }
  let(:end_time) { 2.hours.from_now.to_s }
  let(:start_time) { 1.hour.from_now.to_s }
  let(:user_id) { current_user.id }

  include_context 'with mutation execution setup'
  include_context 'with stubbed policies'

  specify { expect(data[:createShift][:shift][:published]).to be(false) }

  it 'creates a shift for the user' do
    expect { execution_result }.to change(current_user.shifts, :count).by(1)
  end

  it 'creates a shift with the correct start time' do
    Timecop.freeze do
      expect(Time.parse(data[:createShift][:shift][:startTime])).to eq(Time.parse(start_time))
    end
  end

  it 'creates a shift with the correct end time' do
    Timecop.freeze do
      expect(Time.parse(data[:createShift][:shift][:endTime])).to eq(Time.parse(end_time))
    end
  end

  describe 'authentication' do
    context 'when there is a current user' do
      let(:current_user) { create(:user) }

      specify { expect(errors).to be_nil }
      specify { expect(data[:createShift][:errors]).to be_nil }
      specify { expect(data[:createShift][:shift]).not_to be_nil }
    end

    context 'when there is not a current user' do
      let(:current_user) { nil }
      let(:user_id) { create(:user).id }

      specify { expect(errors.pluck(:message)).to include(match(/authentication/i)) }
      specify { expect(data[:createShift]).to be_nil }
    end
  end
end
