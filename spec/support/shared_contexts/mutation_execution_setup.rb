# frozen_string_literal: true

RSpec.shared_context 'mutation_execution_setup' do
  let(:execution_result) do
    SomeSchedulesSchema.execute(
      mutation,
      variables: deep_camelize_keys(variables.with_indifferent_access),
      context: context
    ).with_indifferent_access
  end

  include_context 'shared_execution_setup'
end
