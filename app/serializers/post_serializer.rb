class PostSerializer < ActiveModel::Serializer
  attributes :id, :movie_id, :date, :formatted_date, :content

  def date
    object.created_at
  end

  def formatted_date
    object.created_at.to_date.to_formatted_s :long_ordinal
  end
end
