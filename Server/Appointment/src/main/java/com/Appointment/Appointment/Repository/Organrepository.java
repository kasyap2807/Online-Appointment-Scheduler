package com.Appointment.Appointment.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Appointment.Appointment.models.Orgnmodel;
import com.Appointment.Appointment.models.UserModel;

import jakarta.transaction.Transactional;

public interface Organrepository extends JpaRepository<Orgnmodel,Integer>{
    @Modifying
    @Transactional
    @Query(value = "insert into Providers (email,password,name,phone_number,category,designation) values (:email,SHA1(:password),:name,:phone_number,:category,:designation)", nativeQuery = true)
    public void Signup(@Param("email") String email,@Param("password") String password, @Param("name") String name, @Param("phone_number") String phone_number, @Param("category") String type_of_user, @Param("designation") String designation);    

     @Query(value = "select * from Providers where email = :email and password = SHA1(:password)",nativeQuery = true)
    public Orgnmodel login(@Param("email") String Email,@Param("password") String Password);

    @Query(value = "select * from providers where designation=:designation ;",nativeQuery = true)
    public List<Orgnmodel> getdocs(@Param("designation") String designation);

    @Query(value = "select * from providers where id=:id ;",nativeQuery = true)
    public Orgnmodel getdocsname(@Param("id") int id);
}
