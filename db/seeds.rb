require 'yaml'

seed = YAML.load_file(Rails.root.join("db","movie_seed.yml"))
Movie.create(seed['movies'])