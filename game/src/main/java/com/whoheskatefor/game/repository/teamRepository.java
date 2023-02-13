package com.whoheskatefor.game.repository;

import com.whoheskatefor.game.entity.team;
import org.springframework.data.jpa.repository.JpaRepository;


public interface teamRepository extends JpaRepository<team,Long>  {
    
}
