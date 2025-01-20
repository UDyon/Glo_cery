package com.rehappy.repository;

import com.rehappy.model.Profile;
import com.rehappy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    // 특정 부모 사용자와 연결된 모든 프로필 조회
    List<Profile> findByParentUser(User parentUser);

    // 특정 사용자와 연결된 프로필 조회
    Profile findByLinkedUser(User linkedUser);
}
