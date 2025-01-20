package com.rehappy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // 프로필 이름

    @ManyToOne
    @JoinColumn(name = "parent_user_id")
    @JsonIgnore
    private User parentUser;

    @OneToOne
    @JoinColumn(name = "linked_user_id")
    private User linkedUser;
}
