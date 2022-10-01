class Article < ApplicationRecord

  belongs_to :category
  belongs_to :author, class_name: "User"

  scope :published, -> { where('published_at < ?', Time.now) }
  scope :not_published, -> { where('published_at > ?', Time.now) }

end
