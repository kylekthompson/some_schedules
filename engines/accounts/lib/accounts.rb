# frozen_string_literal: true

require_map = {}
ignored_gems = []

Gem.loaded_specs["accounts"].dependencies.each do |d|
  next if ignored_gems.include?(d.name)
  require(require_map[d.name] || d.name)
end

module Accounts
  class Engine < ::Rails::Engine
    initializer "accounts.eager_load_paths" do |app|
      paths = Dir.glob(File.expand_path("../{app,lib}/**/*", __dir__))
      app.config.autoload_paths += paths
      app.config.eager_load_paths += paths
    end
  end
end
