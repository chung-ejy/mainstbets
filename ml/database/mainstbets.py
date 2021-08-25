from database.adatabase import ADatabase

class MainStBets(ADatabase):
    
    def __init__(self):
        super().__init__("mainstbets")
    
    def retrieve_ticker_price(self,ticker):
        try:
            db = self.client[self.name]
            table = db["full"]
            data = table.find({"ticker":ticker},show_record_id=False)
            return pd.DataFrame(list(data))
        except Exception as e:
            print(self.name,table_name,str(e))