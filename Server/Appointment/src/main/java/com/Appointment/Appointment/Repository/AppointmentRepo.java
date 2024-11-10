package com.Appointment.Appointment.Repository;

import java.util.List;
import java.util.Map;

import org.hibernate.annotations.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.Appointment.Appointment.models.Appointment;
import com.Appointment.Appointment.models.slots;

import jakarta.transaction.Transactional;

public interface AppointmentRepo extends JpaRepository<Appointment,Long>{
    
    @Query(value = "select * from newbook where user_id = :userid",nativeQuery = true)
    public List<Appointment> getappointmentforuser(@Param("userid") int userid);

    @Query(value = "select * from newbook where for_id = :for_id",nativeQuery = true)
    public List<Appointment> getappointmentforprovider(@Param("for_id") int for_id);

    @Modifying
    @Transactional
    @Query(value = "update newbook set date = :date, slot = :slot where booking_id = :bookingid ;", nativeQuery = true)
    public void updateappointment(@Param("date") String date, @Param("slot") int slot,@Param("bookingid") Long bookingid);

    @Modifying
    @Transactional
    @Query(value = "update newbook set status = :status where booking_id = :bookingid ;", nativeQuery = true)
    public void statusupdate(@Param("status") String status,@Param("bookingid") Long bookingid);


    @Query(value = "select * from booking where !( (slotno in (select slotno from booking)) and (slotno in (select slot from newbook where (date = :date and for_id = :forid))));", nativeQuery = true)
    public List<Map<String, Object>> getavilables(@Param("date") String date, @Param("forid") int forid);
    
}
