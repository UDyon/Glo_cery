package com.rehappy.service;

import com.rehappy.dto.ProfileCreationDto;
import com.rehappy.dto.ProfileDto;
import com.rehappy.model.Profile;
import com.rehappy.model.User;
import com.rehappy.repository.ProfileRepository;
import com.rehappy.repository.UserRepository;
import com.rehappy.Util.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * 현재 사용자의 부모 사용자 조회
     */
    public User getParentUser(String email) {
        // 현재 사용자 조회
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 연결된 사용자로 프로필 조회
        Profile profile = profileRepository.findByLinkedUser(currentUser);
        if (profile == null) {
            throw new IllegalArgumentException("사용자의 프로필을 찾을 수 없습니다.");
        }

        // 디버깅 로그 추가
        System.out.println("현재 사용자: " + currentUser.getName() + ", 부모 사용자: " + profile.getParentUser().getName());

        return profile.getParentUser();
    }

    /**
     * 부모 사용자와 연결된 모든 프로필 조회
     */
    public List<ProfileDto> getProfilesByParentUser(String email) {
        // 부모 사용자 조회
        User parentUser = getParentUser(email);

        // 부모 사용자와 연결된 모든 프로필 조회
        List<Profile> profiles = profileRepository.findByParentUser(parentUser);

        // 디버깅 로그 추가
        System.out.println("부모 사용자: " + parentUser.getName() + ", 연결된 프로필 수: " + profiles.size());

        // 필요한 데이터만 포함하는 DTO로 변환
        return profiles.stream()
                .map(profile -> new ProfileDto(profile.getId(), profile.getName(), profile.getLinkedUser().getProfilePictureType()))
                .collect(Collectors.toList());
    }

    public void createProfile(ProfileCreationDto dto, String parentEmail) {
        User parentUser = userRepository.findByEmail(parentEmail)
                .orElseThrow(() -> new IllegalArgumentException("부모 사용자를 찾을 수 없습니다."));

        if (parentUser.getProfiles().size() >= 5) {
            throw new IllegalArgumentException("최대 5개의 프로필만 생성 가능합니다.");
        }

        // 새로운 사용자 생성
        User newUser = new User();
        newUser.setName(dto.getName());
        newUser.setEmail(dto.getEmail());
        newUser.setProfilePictureType(dto.getProfilePictureType());
        newUser.setRole("PROFILE");
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(newUser);

        // 프로필 생성 및 연결
        Profile profile = new Profile();
        profile.setName(dto.getProfileName());
        profile.setParentUser(parentUser);
        profile.setLinkedUser(newUser);

        profileRepository.save(profile);
    }

    public String loginWithProfile(Long profileId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new IllegalArgumentException("프로필을 찾을 수 없습니다."));

        User linkedUser = profile.getLinkedUser();
        if (linkedUser == null) {
            throw new IllegalArgumentException("이 프로필에 연결된 사용자가 없습니다.");
        }

        // 새로운 토큰 생성
        return jwtUtil.generateToken(linkedUser.getId(), linkedUser.getEmail(), "ROLE_USER", linkedUser.getName(), linkedUser.getProfilePictureType());
    }
}