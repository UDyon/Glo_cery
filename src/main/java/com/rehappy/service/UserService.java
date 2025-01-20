package com.rehappy.service;

import com.rehappy.model.Profile;
import com.rehappy.model.User;
import com.rehappy.repository.UserRepository;
import com.rehappy.repository.ProfileRepository;
import com.rehappy.Util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, ProfileRepository profileRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // 회원가입
    public User registerUser(User user, boolean isDoctor) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(isDoctor ? "DOCTOR" : "USER");
        user.setProfilePictureType(1);
        // 사용자 저장
        User savedUser = userRepository.save(user);

        // 기본 프로필 생성
        createDefaultProfileForUser(savedUser);

        return savedUser;
    }

    // 로그인
    public String login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 이메일입니다.");
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 올바르지 않습니다.");
        }

        // JWT 생성
        return jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole(), user.getName(), user.getProfilePictureType());
    }

    // 이메일로 User ID 조회
    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 사용자가 존재하지 않습니다."))
                .getId();
    }

    private void createDefaultProfileForUser(User user) {
        if (profileRepository.findByLinkedUser(user)==null) {
            Profile defaultProfile = new Profile();
            defaultProfile.setName(user.getName() + "의 기본 프로필");
            defaultProfile.setParentUser(user); // 부모 사용자 설정
            defaultProfile.setLinkedUser(user); // 자신과 연결 설정

            profileRepository.save(defaultProfile);
        }
    }
}
