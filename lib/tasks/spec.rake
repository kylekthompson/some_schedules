# frozen_string_literal: true

namespace :spec do
  namespace :engines do
    desc "Run all engine specs"
    task :all do
      Dir.glob(File.expand_path("../../engines/*", __dir__)).map { |f| File.basename(f) }.sort.each do |engine|
        Rake::Task["spec:engines:single"].execute(engine: engine)
      end
    end

    desc "Run specs for one engine"
    task :single, [:engine] => :environment do |_task, args|
      Dir.chdir(File.expand_path("../..", __dir__)) do
        sh "(cd engines/#{args[:engine]} && bundle exec rspec)"
      end
    end
  end

  task engines: "engines:all"
end
