class User < ApplicationRecord
  has_secure_password

  has_many :articles, foreign_key: :author_id

  validates :name, presence: true
  validates :email, presence: true
  validates :password_digest, presence: true

end
