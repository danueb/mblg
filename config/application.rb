require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Mblg
  class Application < Rails::Application
    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'local_env.yml')
      if File.exists?(env_file)
            YAML.load(File.open(env_file))[Rails.env].each do |key, value|
                ENV[key.to_s] = value
            end 
        end
    end
  end
end
