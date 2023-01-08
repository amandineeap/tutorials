class Stock < ApplicationRecord
  def self.new_lookup(ticker_symbol)
    client = IEX::Api::Client.new(
      publishable_token: Rails.application.credentials.iexcloud[:publishable_token],
      secret_token:  Rails.application.credentials.iexcloud[:secret_token],
      endpoint: 'https://cloud.iexapis.com/v1'
    )
    begin
      new(ticker: ticker_symbol , name: 'Company name', last_price: client.quote(ticker_symbol).latest_price)
    rescue => exception
      return nil
    end
      # client.quote(ticker_symbol).latest_price
  end
end