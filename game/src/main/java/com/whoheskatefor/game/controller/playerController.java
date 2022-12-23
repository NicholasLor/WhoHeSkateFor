package com.whoheskatefor.game.controller;

import com.whoheskatefor.game.entity.player;
import com.whoheskatefor.game.service.playerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/player")
@CrossOrigin
public class playerController {


    private final playerService playerService;

    @Autowired
    public playerController(playerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/random")
    public player getRandomPlayer(){
        return playerService.getRandomPlayer();
    }


}
