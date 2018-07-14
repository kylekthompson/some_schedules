# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name        = "api"
  s.version     = "0.0.1"
  s.authors     = ["Kyle Thompson"]
  s.email       = ["kyle@kylekthompson.com"]
  s.summary     = "The API Engine"

  # external

  # internal
  s.add_dependency "accounts"
  s.add_dependency "authentication"
  s.add_dependency "core"
  s.add_dependency "schedules"
end
