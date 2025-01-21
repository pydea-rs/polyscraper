from decouple import config
from py_clob_client.client import ClobClient
from py_clob_client.constants import POLYGON

import os

def clear_screen():
    if os.name == 'nt':
        os.system('cls')
        return
    os.system('clear')

def list_markets(markets):
    clear_screen()
    for i, market in enumerate(markets):
        print(f"{i + 1}: {market['question']}")
    print('- - - - - - - - - - - - - - - - - - - - - - - -')

def main():
    # Set up the client
    host = "https://clob.polymarket.com"
    private_key = config("PRIVATE_KEY")  # Ensure your private key is stored securely
    chain_id = POLYGON

    client = ClobClient(host, key=private_key, chain_id=chain_id)

    # Fetch the list of markets
    next_cursor = None

    while True:
        markets = client.get_markets() if not next_cursor else client.get_markets(next_cursor=next_cursor)

        list_markets(markets['data'])

        next_cursor = markets['next_cursor']
        choice = input('Hit Enter to go to next 500, or enter an index to show its data:')

        try:
            while choice and (choice := int(choice)) and choice >= 1 and choice <= 500:
                clear_screen()
                print(f'- - - - - - - - - - - - - - - - - - - - Market#{choice} - - - - - - - - - - - - - - - - - - - - ')
                selected = markets['data'][choice - 1]
                print('- ', selected['question'])
                for token in selected['tokens']:
                    print('\t* ', token['outcome'], '\t', f'{token['price']}$\n')
                print('- - - - - - - - - - - - - - - - - - - - Description - - - - - - - - - - - - - - - - - - - - ')
                print('\t', selected['description'])
                
                print('- - - - - - - - - - - - - - - - - - - - Extra Info - - - - - - - - - - - - - - - - - - - - ')
                for field in selected:
                    if field == 'question' or field == 'description':
                        continue
                    match field:
                        case 'tokens':
                            print('\t', 'Tokens:')
                            for token in selected['tokens']:
                                print('\t\t', token['outcome'], f'\t{token['price']}$,\t', 'Winner:', 'Yes,' if token['winner'] else 'No,', '\tID:', token['token_id'])

                        case 'tags':
                            print('\tTags:', ', '.join(selected['tags']))
                        case _:
                            title = ' '.join([x.capitalize() for x in field.split('_')])
                            print("\t", f'{title}: ', selected[field])

                print('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
                input('\nEnter To Continue ...')
                list_markets(markets['data'])
                choice = input('Hit Enter to go to next 500, or enter an index to show its data:')
        except:
            pass

if __name__ == '__main__':
    main()