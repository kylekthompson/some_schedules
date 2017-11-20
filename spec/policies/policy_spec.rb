# frozen_string_literal: true

require 'rails_helper'

class TestClassPolicy < Policy; end
class TestModelPolicy < Policy; end
class TestClass; end
class TestModel < ApplicationRecord; end

RSpec.describe Policy, type: :model do
  let(:current_user) { build(:user, id: 1) }

  describe '#initialize' do
    subject(:policy) { TestClassPolicy.new(current_user: current_user, subject: subject) }

    context 'when the subject is a valid class for that policy' do
      let(:subject) { TestClass }

      specify { expect { policy }.not_to raise_error }
    end

    context 'when the subject is a valid instance of a class for that policy' do
      let(:subject) { TestClass.new }

      specify { expect { policy }.not_to raise_error }
    end

    context 'when the subject is an invalid class for that policy' do
      let(:subject) { User }

      specify { expect { policy }.to raise_error(described_class::WrongPolicyError) }
    end

    context 'when the subject is an invalid instance of a class for that policy' do
      let(:subject) { User.new }

      specify { expect { policy }.to raise_error(described_class::WrongPolicyError) }
    end

    context 'when the subject is a string' do
      let(:subject) { 'string' }

      specify { expect { policy }.not_to raise_error }
    end

    context 'when the subject is a symbol' do
      let(:subject) { :symbol }

      specify { expect { policy }.not_to raise_error }
    end

    context 'when the subject is nil' do
      let(:subject) { nil }

      specify { expect { policy }.not_to raise_error }
    end
  end

  describe '#scope' do
    context 'when the subject is not backed by ActiveRecord' do
      subject(:policy) { TestClassPolicy.new(current_user: current_user, subject: subject) }

      let(:subject) { TestClass }

      it 'raises an error' do
        expect { policy.scope }.to raise_error(described_class::UnableToScopeError)
      end
    end

    context 'when the subject is backed by ActiveRecord' do
      subject(:policy) { TestModelPolicy.new(current_user: current_user, subject: subject) }

      let(:subject) { TestModel }

      before do
        allow(TestModel).to receive(:all).and_return(nil)
      end

      it 'returns the entire model by default' do
        policy.scope
        expect(TestModel).to have_received(:all)
      end
    end
  end

  describe '.for' do
    context 'when the subject is a class' do
      it 'finds the right policy' do
        expect(described_class.for(current_user: current_user, subject: TestClass)).to be_a(TestClassPolicy)
      end
    end

    context 'when the subject is an instance of a class' do
      it 'finds the right policy' do
        expect(described_class.for(current_user: current_user, subject: TestClass.new)).to be_a(TestClassPolicy)
      end
    end

    context 'when the subject is a symbol' do
      it 'finds the right policy' do
        expect(described_class.for(current_user: current_user, subject: :test_class)).to be_a(TestClassPolicy)
      end
    end

    context 'when the subject is a string' do
      it 'finds the right policy' do
        expect(described_class.for(current_user: current_user, subject: 'test_class')).to be_a(TestClassPolicy)
      end
    end
  end

  describe '.scope' do
    context 'when the subject is not backed by ActiveRecord' do
      it 'raises an error by default' do
        expect { described_class.scope(current_user: current_user, subject: TestClass) }
          .to raise_error(described_class::UnableToScopeError)
      end
    end

    context 'when the subject is backed by ActiveRecord' do
      before do
        allow(TestModel).to receive(:all).and_return(nil)
      end

      it 'returns the entire model by default' do
        described_class.scope(current_user: current_user, subject: TestModel)
        expect(TestModel).to have_received(:all)
      end
    end
  end
end
