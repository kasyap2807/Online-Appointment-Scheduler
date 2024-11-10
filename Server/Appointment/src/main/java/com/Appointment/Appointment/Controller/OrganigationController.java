package com.Appointment.Appointment.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Appointment.Appointment.Repository.Organrepository;
import com.Appointment.Appointment.Services.Service;
import com.Appointment.Appointment.models.Orgnmodel;

@CrossOrigin(value = "http://localhost:3000/")
@RestController
@RequestMapping("organ")
public class OrganigationController {
    
    @Autowired
    Service service;

    @Autowired
    Organrepository organrepository;

    @PostMapping("/signup")
    public String signup(@RequestBody Orgnmodel orgnmodel){
        return service.Providersignup(orgnmodel);
    }

    @PostMapping("/login")
    public Orgnmodel login(@RequestBody Orgnmodel orgnmodel){
        return service.Providerlogin(orgnmodel);
    }

    @PostMapping("/getdocs")
    public List<Orgnmodel> getdocs(@RequestBody Orgnmodel orgnmodel){
        return service.getdocs(orgnmodel);
    }

    @PostMapping("/getdocsname")
    public Orgnmodel getdocsname(@RequestBody Orgnmodel orgnmodel){
        return service.getdocsname(orgnmodel);
    }
}
