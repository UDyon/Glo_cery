package com.rehappy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDto {
    private Long id;
    private String name;
    private int profilePictureType; // 추가된 필드

    public ProfileDto(Long id, String name, int profilePictureType) {
        this.id = id;
        this.name = name;
        this.profilePictureType = profilePictureType;
    }
}
