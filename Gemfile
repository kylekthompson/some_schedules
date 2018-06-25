# frozen_string_literal: true

source 'https://rubygems.org'

if ENV['ENGINE'].nil?
  if Dir.pwd.split('/')[-2] == 'engines'
    ENV['ENGINE'] = Dir.pwd.split('/').last
  else
    match = ARGV.map { |x| %r{engines/(\w+)/}.match(x) || %r{engines/(\w+)}.match(x) }.compact.first
    ENV['ENGINE'] = match[1] if match
  end
end

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

gem 'active_model_serializers'
gem 'bcrypt', '~> 3.1.11'
gem 'jwt'
gem 'oj'
gem 'pg', '~> 1.0'
gem 'puma', '~> 3.11.4'
gem 'rails', '~> 5.2.0'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'ffaker'
  gem 'pry'
  gem 'pry-byebug'
  gem 'pry-doc'
  gem 'rspec-rails'
  gem 'rubocop', require: false
  gem 'rubocop-rspec', require: false
end

group :development do
  gem 'bullet'
  gem 'foreman', require: false
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'codecov', require: false
  gem 'database_cleaner', require: false
  gem 'rails-controller-testing'
  gem 'shoulda-callback-matchers', '~> 1.1.1'
  gem 'shoulda-matchers', github: 'thoughtbot/shoulda-matchers', branch: 'rails-5'
  gem 'timecop'
end

# engines
Dir.glob(File.expand_path('engines/*', __dir__)).each do |path|
  engine = File.basename(path)
  gem engine, path: "engines/#{engine}", require: (ENV['ENGINE'].nil? || ENV['ENGINE'] == engine)
end
