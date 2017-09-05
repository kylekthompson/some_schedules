# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SomeSchedulesSchema, type: :model do
  subject(:schema) { described_class }

  it { is_expected.to have_mutation_type(Types::MutationType) }
  it { is_expected.to have_query_type(Types::QueryType) }
  it { is_expected.to use_object_decoder(Relay::GlobalID::Decode) }
  it { is_expected.to use_object_encoder(Relay::GlobalID::Encode) }
  it { is_expected.to use_type_resolver(Relay::TypeResolver) }
end