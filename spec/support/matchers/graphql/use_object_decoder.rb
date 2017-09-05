# frozen_string_literal: true

RSpec::Matchers.define :use_object_decoder do |decoder|
  match do |schema|
    schema.object_from_id_proc == decoder
  end
end
