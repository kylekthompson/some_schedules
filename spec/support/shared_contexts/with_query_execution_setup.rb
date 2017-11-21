# frozen_string_literal: true

RSpec.shared_context 'with query execution setup' do
  let(:execution_result) do
    SomeSchedulesSchema.execute(
      query,
      variables: deep_camelize_keys(variables.with_indifferent_access),
      context: context
    ).with_indifferent_access
  end

  include_context 'with shared execution setup'
end
