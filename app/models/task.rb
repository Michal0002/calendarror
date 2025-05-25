class Task < ApplicationRecord
  belongs_to :user

  enum importance: {low: 0, high: 1}

  validates :title, :importance, :start_time, :end_time, presence: true
  validate :end_after_start

  def end_after_start
    return if end_time.blank? || start_time.blank?

    if end_time < start_time
      errors.add(:end_time, "musi być późniejszy niż czas rozpoczęcia")
    end
  end
end
