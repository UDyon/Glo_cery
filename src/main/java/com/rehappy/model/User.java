package com.rehappy.model;

import jakarta.persistence.*;
import lombok.Data;
import com.rehappy.model.Profile;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // "USER" 또는 "DOCTOR"

    @Column(nullable = false)
    private int profilePictureType = 1;

    private String licenseNumber;
    private String hospitalName;

    @OneToMany(mappedBy = "parentUser", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Profile> profiles = new ArrayList<>();
}
