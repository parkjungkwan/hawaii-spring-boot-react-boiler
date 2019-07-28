package com.bitcamp.web.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import com.bitcamp.web.common.lambda.ISupplier;
import com.bitcamp.web.domain.BoardDTO;
import com.bitcamp.web.entities.Board;
import com.bitcamp.web.repositories.BoardRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * BoardController
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/board")
public class BoardController {
    @Autowired BoardDTO board;
    @Autowired BoardRepository repo;

    //카운트(테스트 : 성공)
    @GetMapping("/count")
    public long count(){
        System.out.println("=========================MemberController.count()");  
        ISupplier fx = ()->{
            return repo.count();            
        };
        return (long)fx.get();
    }

    //글작성
    @PostMapping("")
    public HashMap<String,String> save(@RequestBody BoardDTO dto){
        System.out.println("=========================MemberController.save()");
        HashMap<String,String> map = new HashMap<>();
        Board entity              = new Board();
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        entity.setEmail(dto.getEmail());
        entity.setRegDate(new Date());

        try {
            repo.save(entity);
            map.put("result","글작성 성공");  
        } catch (Exception e) {
            map.put("result","실패");  
        }
        return map;   
    }
    //글 목록 페이지
    @GetMapping("/boardList")
     public Iterable<Board>	findAll(){
         System.out.println("=========================BoardController.findAll()");
         
         Iterable<Board> entities = repo.findAll();
         List<Board> list      = new ArrayList<>();
         
         for(Board m: entities){
             list.add(m);
         }
         System.out.println(list);
         return list; 
     }
     //글상세보기
     @GetMapping("/boardDetail/{id}")
     public Board boardDetail(@PathVariable String id){
        System.out.println("=========================BoardController.boardDetail()");
        // System.out.println(id);
        
        return repo.findById(Long.parseLong(id)).orElseThrow(EntityNotFoundException::new);
     }
     //글삭제
     @DeleteMapping("{id}")
     public HashMap<String,Object>	deleteById(@PathVariable String id){
        System.out.println("=========================BoardController.deleteById()");
        HashMap<String,Object> map = new HashMap<>();
        //삭제
        repo.deleteById(Long.parseLong(id));
        map.put("result","삭제되었습니다.");
        return map;
     }
     //글수정
     @PostMapping("/updateBoard")
     public HashMap<String,String> updateBoard(@RequestBody BoardDTO dto){
        System.out.println("=========================BoardController.updateBoard()");
        System.out.println("넘어온 아이디"+dto.getId()+"   넘어온 제목"+dto.getTitle()+"   넘어온 내용"+dto.getContent());
        //바뀌기 전 원래거를 찾아오는것
        Board entity = repo.findById(Long.parseLong(dto.getId())).orElseThrow(EntityNotFoundException::new);
        // entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setContent(dto.getContent());
        //저장
        repo.save(entity); 
        HashMap<String,String> map = new HashMap<>();
        map.put("result","수정성공");
        return map;
     }

}