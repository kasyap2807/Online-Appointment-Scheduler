package com.Appointment.Appointment.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Appointment.Appointment.Repository.MainRepository;
import com.Appointment.Appointment.Services.Service;
import com.Appointment.Appointment.models.Orgnmodel;
import com.Appointment.Appointment.models.UserModel;

@CrossOrigin(value = "http://localhost:3000/")
@RestController
@RequestMapping()
public class Controller {
    @Autowired
    Service service;

    @Autowired
    MainRepository mainRepository;

    @PostMapping("/signup")
    public String savedata(@RequestBody UserModel model){
        return service.signup(model);
    }

    @PostMapping("/login")
    public UserModel login(@RequestBody UserModel model){
        return service.login(model);
    }

    @PostMapping("/getuserdata")
    public UserModel getdocsname(@RequestBody UserModel userModel){
        return service.getuserdata(userModel);
    }
}
