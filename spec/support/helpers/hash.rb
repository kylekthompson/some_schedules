# frozen_string_literal: true

def deep_camelize_keys(hash)
  hash.deep_transform_keys { |key| key.to_s.camelize(:lower) }
end
