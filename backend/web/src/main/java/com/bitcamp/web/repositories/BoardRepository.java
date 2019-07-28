package com.bitcamp.web.repositories;

import com.bitcamp.web.entities.Board;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
/**
 * BoardRepository
 */
@Repository
public interface BoardRepository extends CrudRepository<Board, Long>{

    
}