package com.Appointment.Appointment.Services;

import java.util.List;
import java.util.Map;

import com.Appointment.Appointment.models.Appointment;
import com.Appointment.Appointment.models.Orgnmodel;
import com.Appointment.Appointment.models.UserModel;
import com.Appointment.Appointment.models.slots;

public interface Service {
    public String signup(UserModel model);
    public UserModel login(UserModel model);
    public String Providersignup(Orgnmodel model);
    public Orgnmodel Providerlogin(Orgnmodel model);
    public String appointmentbook(Appointment model);
    public List<Appointment> getAppointmentsforuser(Appointment model);
    public List<Appointment> getAppointmentsforprovider(Appointment model);
    public String setappointmentupdate(Appointment model);
    public String statusUpdate(Appointment model);
    public List<Map<String, Object>> getslots(Appointment model);
    public List<Orgnmodel> getdocs(Orgnmodel model);
    public Orgnmodel getdocsname(Orgnmodel model);
    public UserModel getuserdata(UserModel model);
}
