package com.Appointment.Appointment.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Providers")
public class Orgnmodel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "email", unique = true)
    String Email;

    @Column(name = "password")
    String Password;

    @Column(name = "PhoneNumber")
    String phonenumber;

    @Column(name = "category")
    String category;

    @Column(name = "name")
    String name;

    @Column(name = "designation")
    String designation;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Orgnmodel(int id, String email, String password, String phonenumber, String category, String name,
            String designation) {
        this.id = id;
        this.Email = email;
        this.Password = password;
        this.phonenumber = phonenumber;
        this.category = category;
        this.name = name;
        this.designation = designation;
    }

    public Orgnmodel() {
    }

    
}
