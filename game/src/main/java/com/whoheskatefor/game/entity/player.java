package com.whoheskatefor.game.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @Entity @Table(name="player")
public class player {

    private int team_id;
    @Id
    private Long player_id;

    private String player_fullName;

    public player(String fullName, int team_id) {

        this.player_fullName = fullName;
        this.team_id = team_id;

    }

    public player(int team_id, Long player_id, String player_fullName) {
        this.team_id = team_id;
        this.player_id = player_id;
        this.player_fullName = player_fullName;
    }

    public String getPlayerPhoto(){
        
    }

    @Override
    public String toString() {
        return "player{" +
                "team_id=" + team_id +
                ", player_id=" + player_id +
                ", fullName='" + player_fullName + '\'' +
                '}';
    }
}
