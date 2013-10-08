class PostSerializer < ActiveModel::Serializer
  attributes :id, :movie_id, :date, :content

  def date
    object.created_at
  end
end
