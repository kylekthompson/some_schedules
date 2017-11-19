# frozen_string_literal: true

require 'rails_helper'

class TestClassPolicy < Policy; end
class TestModelPolicy < Policy; end
class TestClass; end
class TestModel < ApplicationRecord; end

RSpec.describe Policy, type: :model do
  let(:user) { build(:user, id: 1) }

  describe '#initialize' do
    subject(:policy) { TestClassPolicy.new(user: user, policed: policed) }

    context 'when the policed value is a valid class for that policy' do
      let(:policed) { TestClass }

      specify { expect { policy }.not_to raise_error }
    end

    context 'when the policed value is a valid instance of a class for that policy' do
      let(:policed) { TestClass.new }

      specify { expect { policy }.not_to raise_error }
    end

    context 'when the policed value is an invalid class for that policy' do
      let(:policed) { User }

      specify { expect { policy }.to raise_error(described_class::WrongPolicyError) }
    end

    context 'when the policed value is an invalid instance of a class for that policy' do
      let(:policed) { User.new }

      specify { expect { policy }.to raise_error(described_class::WrongPolicyError) }
    end

    context 'when the policed value is a string' do
      let(:policed) { 'string' }

      specify { expect { policy }.not_to raise_error }
    end

    context 'when the policed value is a symbol' do
      let(:policed) { :symbol }

      specify { expect { policy }.not_to raise_error }
    end

    context 'when the policed value is nil' do
      let(:policed) { nil }

      specify { expect { policy }.not_to raise_error }
    end
  end

  describe '#scope' do
    context 'when the policed value is not backed by ActiveRecord' do
      subject(:policy) { TestClassPolicy.new(user: user, policed: policed) }

      let(:policed) { TestClass }

      it 'raises an error' do
        expect { policy.scope }.to raise_error(described_class::UnableToScopeError)
      end
    end

    context 'when the policed value is backed by ActiveRecord' do
      subject(:policy) { TestModelPolicy.new(user: user, policed: policed) }

      let(:policed) { TestModel }

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
    context 'when the policed value is a class' do
      it 'finds the right policy' do
        expect(described_class.for(user: user, policed: TestClass)).to be_a(TestClassPolicy)
      end
    end

    context 'when the policed value is an instance of a class' do
      it 'finds the right policy' do
        expect(described_class.for(user: user, policed: TestClass.new)).to be_a(TestClassPolicy)
      end
    end

    context 'when the policed value is a symbol' do
      it 'finds the right policy' do
        expect(described_class.for(user: user, policed: :test_class)).to be_a(TestClassPolicy)
      end
    end

    context 'when the policed value is a string' do
      it 'finds the right policy' do
        expect(described_class.for(user: user, policed: 'test_class')).to be_a(TestClassPolicy)
      end
    end
  end

  describe '.scope' do
    context 'when the policed value is not backed by ActiveRecord' do
      it 'raises an error by default' do
        expect { described_class.scope(user: user, policed: TestClass) }
          .to raise_error(described_class::UnableToScopeError)
      end
    end

    context 'when the policed value is backed by ActiveRecord' do
      before do
        allow(TestModel).to receive(:all).and_return(nil)
      end

      it 'returns the entire model by default' do
        described_class.scope(user: user, policed: TestModel)
        expect(TestModel).to have_received(:all)
      end
    end
  end
end
