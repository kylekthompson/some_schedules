# frozen_string_literal: true

require_relative "../../accounts/spec/rails_helper"
require_relative "../../core/spec/rails_helper"

Dir[File.dirname(__FILE__) + "/support/**/*.rb"].each { |f| require f }
FactoryBot.definition_file_paths += ["#{File.dirname(__FILE__)}/factories"]
