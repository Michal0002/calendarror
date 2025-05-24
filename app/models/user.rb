class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         attr_writer :login

         def login
           @login || username || email
         end
       
         def self.find_for_database_authentication(warden_conditions)
           conditions = warden_conditions.dup
           if login = conditions.delete(:login)
             where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { value: login.downcase }]).first
           else
             where(conditions.to_h).first
           end
         end
       
         validates :username, presence: true, uniqueness: { case_sensitive: false }
       end