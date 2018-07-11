# frozen_string_literal: true

match = ARGV.map { |x| %r{(engines|gems)/(\w+)/}.match(x) || %r{(engines|gems)/(\w+)}.match(x) }.compact.first

if match
  library_spec_path = File.expand_path(File.dirname(__FILE__) + "/../#{match[1]}/#{match[2]}/spec")
  $LOAD_PATH << library_spec_path

  ENV["ENGINE"] = match[2] if match[1] == "engines"
end
