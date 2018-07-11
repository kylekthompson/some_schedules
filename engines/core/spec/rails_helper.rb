# frozen_string_literal: true

require_relative "spec_helper"
ENV["RAILS_ENV"] ||= "test"
require File.expand_path("../../../config/environment", __dir__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"
Dir[File.dirname(__FILE__) + "/support/**/*.rb"].each { |f| require f }
FactoryBot.definition_file_paths = ["#{File.dirname(__FILE__)}/factories"]

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
