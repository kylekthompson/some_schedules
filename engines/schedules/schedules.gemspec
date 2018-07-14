# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name        = "schedules"
  s.version     = "0.0.1"
  s.authors     = ["Kyle Thompson"]
  s.email       = ["kyle@kylekthompson.com"]
  s.summary     = "The Schedules Engine"

  # external

  # internal
  s.add_dependency "accounts"
  s.add_dependency "core"
end
