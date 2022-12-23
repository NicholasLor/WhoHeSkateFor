package com.whoheskatefor.game.service;

import com.whoheskatefor.game.entity.player;
import com.whoheskatefor.game.repository.playerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class playerService {

    private final playerRepository playerRepository;

    @Autowired
    public playerService(playerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<player> getStudents(){
        return playerRepository.findAll();
    }

    public player getRandomPlayer(){

        long playerCount = getStudents().size();
        Random random = new Random();
        int number = random.nextInt((int) playerCount);

        return (getStudents().get(number));

    }


}
