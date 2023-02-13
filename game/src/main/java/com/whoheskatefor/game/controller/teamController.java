package com.whoheskatefor.game.controller;

import com.whoheskatefor.game.entity.team;
import com.whoheskatefor.game.service.teamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("api/v1/team")
@CrossOrigin
public class teamController {

    private final teamService teamService;

    @Autowired
    public teamController(teamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/{team_id}")
    public team getTeamById(@PathVariable(required = false) Long team_id){
        return teamService.getTeamById(team_id);
    }


    
}
