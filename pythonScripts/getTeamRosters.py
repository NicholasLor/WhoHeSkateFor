
import requests
import json
import pandas as pd
from dotenv import load_dotenv, find_dotenv
from sqlalchemy import create_engine
import os
from os.path import join, dirname
import psycopg2 as pg2


dotenv_path = os.path.join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

POSTGRES_PASSWORD = os.getenv('postgres_password')
POSTGRES_USER = os.getenv('postgres_user')
POSTGRES_DB_NAME = os.getenv('postgres_db_name')

def getRequest(url):
    """Gets JSON formatted response from url

    Args:
        url (string): string of url to be processed

    Returns:
        Dict: JSON object of url response
    """

    response = requests.get(url,stream=True)

    player_info_dict = response.json()
    # print("getresult type: "+type(filingdict))
    # print(filingdict['results'][0])

    return player_info_dict["teams"]

def formatJson(player_info_dict):

    """
    """
    
    # print header info to csv
    teams_df = pd.json_normalize(player_info_dict)

    df1 = (pd.concat({i: pd.DataFrame(x) for i, x in teams_df.pop('roster.roster').items()})
         .reset_index(level=1, drop=True)
         .join(teams_df)
         .reset_index(drop=True)
         .add_prefix('team_'))

    df2 = pd.concat([pd.json_normalize(x) for x in df1['team_person']],ignore_index=True)
    df2 = df2.add_prefix('player_')

    df3 = pd.concat([pd.json_normalize(x) for x in df1['team_position']],ignore_index=True)
    df3 = df3.add_prefix('player_')

    final_players_df = pd.concat([df1, df2, df3], axis=1)
    final_players_df_2 = final_players_df[['team_id','player_id','player_fullName','player_link','player_code','player_name','player_type','player_abbreviation']]
    final_players_df_2.to_csv("players_df.csv")

    teams_df = teams_df.add_prefix('team_')
    teams_df.to_csv("teams_df.csv")


    # create connection to postgres
    engine_string = 'postgresql://{}:{}@localhost:5432/{}'.format(POSTGRES_USER,POSTGRES_PASSWORD,POSTGRES_DB_NAME)
    engine = create_engine(engine_string)
    

    # import dfs to postgres tables
    teams_df.to_sql('team',engine,if_exists='replace')
    final_players_df_2.to_sql('player',engine,if_exists='replace')

def main():

    # call function
    formattedQuery = "https://statsapi.web.nhl.com/api/v1/teams/?expand=team.roster"
    formatJson(getRequest(formattedQuery))


if __name__ == '__main__':
    main()
