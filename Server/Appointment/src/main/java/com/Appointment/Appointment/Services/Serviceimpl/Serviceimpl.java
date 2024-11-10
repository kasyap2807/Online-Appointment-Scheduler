package com.Appointment.Appointment.Services.Serviceimpl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.Appointment.Appointment.Repository.AppointmentRepo;
import com.Appointment.Appointment.Repository.MainRepository;
import com.Appointment.Appointment.Repository.Organrepository;
import com.Appointment.Appointment.Services.Service;
import com.Appointment.Appointment.models.Appointment;
import com.Appointment.Appointment.models.Orgnmodel;
import com.Appointment.Appointment.models.UserModel;
import com.Appointment.Appointment.models.slots;

@org.springframework.stereotype.Service
public class Serviceimpl implements Service {

    @Autowired
    MainRepository mainRepository;

    @Autowired
    Organrepository organrepository;

    @Autowired
    AppointmentRepo appointmentRepo;
    
    @Override
    public String signup(UserModel model) {
        try {
            mainRepository.Signup(model.getEmail(),model.getPassword(),model.getName(),model.getPhonenumber());
            return "saved";
        } catch (Exception e) {
            return "failed";
        }
    }

    @Override
    public UserModel login(UserModel model) {
        try {
            return mainRepository.login(model.getEmail(),model.getPassword());
        } catch (Exception e) {
           return null ;
        }
    }

    @Override
    public String Providersignup(Orgnmodel model) {
        try {
            organrepository.Signup(model.getEmail(),model.getPassword(),model.getName(),model.getPhonenumber(),model.getCategory(),model.getDesignation());
            return "saved";
        } catch (Exception e) {
            return "failed";
        }
    }

    @Override
    public Orgnmodel Providerlogin(Orgnmodel model) {
        try {
            return organrepository.login(model.getEmail(),model.getPassword());
        } catch (Exception e) {
           return null ;
        }
    }

    @Override
    public String appointmentbook(Appointment model) {
        try {
            appointmentRepo.save(model);
            return "saved";
        } catch (Exception e) {
            return "failed";
        }
    }

    @Override
    public List<Appointment> getAppointmentsforuser(Appointment model) {
        try {
            return appointmentRepo.getappointmentforuser(model.getUser_id());
        } catch (Exception e) {
           return null;
        }
    }

    @Override
    public List<Appointment> getAppointmentsforprovider(Appointment model) {
        try {
            return appointmentRepo.getappointmentforprovider(model.getFor_id());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public String setappointmentupdate(Appointment model) {
        try {
             appointmentRepo.updateappointment(model.getDate(),model.getSlot(),model.getBooking_id());
             return "Done" ;
        } catch (Exception e) {
            return "Failed";
        }
    }

    @Override
    public String statusUpdate(Appointment model) {
        try {
             appointmentRepo.statusupdate(model.getStatus(),model.getBooking_id());
             return "Done" ;
        } catch (Exception e) {
            return "Failed";
        }
    }

    @Override
    public List<Map<String, Object>> getslots(Appointment model) {
        try {
            return appointmentRepo.getavilables(model.getDate(),model.getFor_id());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<Orgnmodel> getdocs(Orgnmodel model) {
    //    try {
         return organrepository.getdocs(model.getDesignation());
    //    } catch (Exception e) {
    //     return null;
    //    }
    }  

    @Override
    public Orgnmodel getdocsname(Orgnmodel model) {
    //    try {
         return organrepository.getdocsname(model.getId());
    //    } catch (Exception e) {
    //     return null;
    //    }
    }  

    @Override
    public UserModel getuserdata(UserModel model) {
    //    try {
         return mainRepository.getuserdata(model.getId());
    //    } catch (Exception e) {
    //     return null;
    //    }
    }  
}
