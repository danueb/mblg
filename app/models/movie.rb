class Movie < ActiveRecord::Base
  has_one :post
end
