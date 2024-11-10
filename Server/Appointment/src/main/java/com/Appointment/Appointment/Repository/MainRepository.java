package com.Appointment.Appointment.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Appointment.Appointment.models.Orgnmodel;
import com.Appointment.Appointment.models.UserModel;

import jakarta.transaction.Transactional;

public interface MainRepository extends JpaRepository<UserModel,Integer>{
    @Modifying
    @Transactional
    @Query(value = "insert into users (email,password,name,phone_number) values (:email,SHA1(:password),:name,:phone_number)", nativeQuery = true)
    public void Signup(@Param("email") String email,@Param("password") String password, @Param("name") String name, @Param("phone_number") String phone_number);

    @Query(value = "select * from users where email = :email and password = SHA1(:password)",nativeQuery = true)
    public UserModel login(@Param("email") String Email,@Param("password") String Password);

    @Query(value = "select * from users where id=:id ;",nativeQuery = true)
    public UserModel getuserdata(@Param("id") int id);
}
