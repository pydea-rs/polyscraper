from apify_client import ApifyClient
from decouple import config
# Initialize the ApifyClient with your Apify API token
# Replace '<YOUR_API_TOKEN>' with your token.
apikey = config('API_KEY')
print(apikey)
client = ApifyClient(apikey)

# Prepare the Actor input
run_input = {}

# Run the Actor and wait for it to finish
run = client.actor("louisdeconinck/polymarket-events-scraper").call(run_input=run_input)

# Fetch and print Actor results from the run's dataset (if there are any)
print("💾 Check your data here: https://console.apify.com/storage/datasets/" + run["defaultDatasetId"])
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)

# 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/python/docs/quick-start