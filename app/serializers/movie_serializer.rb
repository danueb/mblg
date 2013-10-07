class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :year, :tmdb_id
end
