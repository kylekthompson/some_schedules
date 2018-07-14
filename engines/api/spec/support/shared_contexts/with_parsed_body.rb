# frozen_string_literal: true

RSpec.shared_context "with parsed body" do
  let(:parsed_body) { JSON.parse(response.body).with_indifferent_access }
end
