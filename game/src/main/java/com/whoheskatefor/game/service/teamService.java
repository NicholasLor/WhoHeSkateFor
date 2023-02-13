package com.whoheskatefor.game.service;

import java.util.Optional;
import com.whoheskatefor.game.entity.team;
import com.whoheskatefor.game.repository.teamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class teamService {

    private final teamRepository teamRepository;

    @Autowired
    public teamService(teamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public team getTeamById(Long team_id) {
        Optional<team> teamById = teamRepository.findById(team_id);
        if (!teamById.isPresent()) {
            throw new IllegalStateException("Student ID does not exist");
        }
        return teamById.get();
    }
    
}
