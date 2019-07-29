package com.bitcamp.web.controller;


import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.IntStream;

import javax.persistence.EntityNotFoundException;

import com.bitcamp.web.common.lambda.ISupplier;
import com.bitcamp.web.domain.BoardDTO;
import com.bitcamp.web.entities.Board;
import com.bitcamp.web.repositories.BoardRepository;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
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
        System.out.println("=========================BoardController.count()");  
        ISupplier fx = ()->{
            return repo.count();            
        };
        return (long)fx.get();
    }

    //글작성
    @PostMapping("")
    public HashMap<String,String> save(@RequestBody BoardDTO dto){
        System.out.println("=========================BoardController.save()");
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
    //글 더미데이터 30개 생성
    @PostMapping("/dummyData")
    public HashMap<String,String>  dummyData(){
        HashMap<String,String> map = new HashMap<>();
        System.out.println("=========================BoardController.dummyData()"); 
        
        IntStream.range(0, 30).forEach(i -> {
            Board entity              = new Board();
            entity.setTitle("test"+i);
            entity.setContent("test");
            entity.setEmail("1@1");
            entity.setRegDate(new Date());

            repo.save(entity);
        });
        map.put("result","더미데이터 생성성공");  
        return map;

    }

    //글 목록 페이지
    @GetMapping("/boardList/{nowPage}/{search}")
     public Page<Board>	findAll(@PathVariable String nowPage, @PathVariable String search){
         System.out.println("=========================BoardController.findAll()");
         System.out.println("검색 받아온 값 : "+search);
         //페이지처리
         Pageable pageable = PageRequest.of(Integer.parseInt(nowPage), 9, Direction.DESC,"id");
         Page<Board> result = repo.findAll(
            repo.makePredicate(search), pageable);

        System.out.println("PAGE : "+result.getPageable());
        System.out.println("---------------------------------"); 
        result.getContent().forEach(board -> System.out.println(""+board));   
        return result;
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
        entity.setFileUrl(dto.getFileUrl());
        //저장
        repo.save(entity); 
        HashMap<String,String> map = new HashMap<>();
        map.put("result","수정성공");
        return map;
     }
     //보드 이미지 업로드
     @PostMapping("/uploadProfileImg")
     public HashMap<String,String>	uploadProfileImg(@RequestParam("photo") MultipartFile image) throws Exception{
        System.out.println("=========================BoardController.updateMypage()");
        System.out.println("넘어온이미지 객채"+image);
        System.out.println("넘어온이미지 객채"+image.getOriginalFilename());
        //보드 이미지 업로드
        String sourceFileName = image.getOriginalFilename(); 
        String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase(); 
        File destinationFile; 
        String destinationFileName;
        //상대경로 구하기
        String path = System.getProperty("user.dir").substring(0, System.getProperty("user.dir").length()-7);
        //필요한 경로로 잘라서 만들기
        String fileUrl = path+"frontend/public/static/images/board/";
        do { 
            destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + sourceFileNameExtension; 
            destinationFile = new File(fileUrl + destinationFileName); 
        } while (destinationFile.exists()); 
        
        destinationFile.getParentFile().mkdirs(); 
        image.transferTo(destinationFile); 
        
        HashMap<String,String> map = new HashMap<>();
        //경로를 맵에 집어넣음
        
        map.put("result",destinationFileName);
        return map;   
     }
}