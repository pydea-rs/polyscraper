from decouple import config
from py_clob_client.client import ClobClient
from py_clob_client.constants import POLYGON
import json

# Set up the client
host = "https://clob.polymarket.com"
private_key = config("PRIVATE_KEY")  # Ensure your private key is stored securely
chain_id = POLYGON

client = ClobClient(host, key=private_key, chain_id=chain_id)

# Fetch the list of markets
markets = client.get_markets()
f = open('text.json', 'w')
f.write(json.dumps(markets['data'][0]))
f.close()
# Display market information
# for market in markets['data']:
#     print(f"Market ID: {market['id']}")
#     print(f"Question: {market['question']}")
#     print(f"Volume: {market['volume']}")
#     print(f"Liquidity: {market['liquidity']}")
#     print(f"End Time: {market['endTime']}")
#     print(f"Category: {market['category']}")
#     print("Outcomes:")
#     for outcome in market['outcomes']:
#         print(f"  - {outcome['name']}: {outcome['price']}")
#     print("-" * 40)
