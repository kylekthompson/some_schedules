# frozen_string_literal: true

RSpec::Matchers.define :use_object_encoder do |encoder|
  match do |schema|
    schema.id_from_object_proc == encoder
  end
end
