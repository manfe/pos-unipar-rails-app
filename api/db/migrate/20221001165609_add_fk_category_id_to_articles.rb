class AddFkCategoryIdToArticles < ActiveRecord::Migration[7.0]
  def change
    add_reference :articles, :category
  end
end
