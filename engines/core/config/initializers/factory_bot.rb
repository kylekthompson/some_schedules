# frozen_string_literal: true

FactoryBot.definition_file_paths += Dir.glob("#{Rails.root}/engines/*/spec/factories") unless Rails.env.test?
