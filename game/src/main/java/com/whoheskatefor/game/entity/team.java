package com.whoheskatefor.game.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @Entity @Table(name="team")
public class team {
    
    @Id
    private int team_id;

    private String team_abbreviation;

    // @Column(name = "team_team_Name")
    // private String team_team_Name;

    @Column(name = "team_divisionname")
    private String team_divisionname;

    @Column(name = "team_conference_name")
    private String team_conferencename;

    public team(int team_id, String team_abbreviation, String team_divisionname, String team_conferencename) {
        this.team_id = team_id;
        this.team_abbreviation = team_abbreviation;
        // this.team_team_Name = team_team_Name;
        this.team_divisionname = team_divisionname;
        this.team_conferencename = team_conferencename;
    }

    @Override
    public String toString() {
        return "team [team_id=" + team_id + ", team_abbreviation=" + team_abbreviation + ", team_Name=" 
        // + team_team_Name
                + ", team_divisionname=" + team_divisionname + ", team_conferencename=" + team_conferencename + "]";
    }
    
    
}
