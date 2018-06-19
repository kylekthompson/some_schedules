# frozen_string_literal: true

require_map = {}
ignored_gems = []

Gem.loaded_specs['domain'].dependencies.each do |d|
  next if ignored_gems.include?(d.name)
  require(require_map[d.name] || d.name)
end

module Domain
  class Engine < ::Rails::Engine
  end
end
