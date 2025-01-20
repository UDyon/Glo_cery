package com.rehappy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileCreationDto {
    private String profileName;
    private String name;
    private String email;
    private String password;
    private String role;
    private int profilePictureType;
}
