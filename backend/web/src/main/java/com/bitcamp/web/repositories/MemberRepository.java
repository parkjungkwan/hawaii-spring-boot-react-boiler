package com.bitcamp.web.repositories;

import com.bitcamp.web.entities.Member;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
/**
 * MemberRepository
 */
@Repository
public interface MemberRepository extends CrudRepository<Member,Long>{
    public Optional<Member> findByEmailAndPwd(String email, String pwd);
    public Optional<Member> findByEmail(String email);
    
}