package com.Appointment.Appointment.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Appointment.Appointment.Services.Service;
import com.Appointment.Appointment.models.Appointment;
import com.Appointment.Appointment.models.slots;

@CrossOrigin(value = "http://localhost:3000/")
@RestController
@RequestMapping("Appointment")
public class AppointmentController {

    @Autowired
    Service service;
    
    @PostMapping("/setappoimtment")
    public String setappoimtment(@RequestBody Appointment appointment){
        return service.appointmentbook(appointment);
    }

    @PostMapping("/getappointmentforuser")
    public List<Appointment> getAppointmentsforuser(@RequestBody Appointment appointment){
        return service.getAppointmentsforuser(appointment);
    }

    @PostMapping("/getappointmentforprovider")
    public List<Appointment> getAppointmentsforprovider(@RequestBody Appointment appointment){
        return service.getAppointmentsforprovider(appointment);
    }

    @PostMapping("/setappointmentupdate")
    public String setappointmentupdate(@RequestBody Appointment appointment){
        return service.setappointmentupdate(appointment);
    }

    @PostMapping("/statusupdate")
    public String statusUpdate(@RequestBody Appointment appointment){
        return service.statusUpdate(appointment);
    }


    @PostMapping("/getAvilable")
    public List<Map<String, Object>> getslots(@RequestBody Appointment appointment){
        return service.getslots(appointment);
    }
}
