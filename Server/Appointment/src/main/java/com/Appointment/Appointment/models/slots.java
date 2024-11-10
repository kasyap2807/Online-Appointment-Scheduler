package com.Appointment.Appointment.models;

public class slots {
    int slotno;
    String time;
    String start_time;
    public int getSlotno() {
        return slotno;
    }
    public void setSlotno(int slotno) {
        this.slotno = slotno;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public String getStart_time() {
        return start_time;
    }
    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }
    public slots(int slotno, String time, String start_time) {
        this.slotno = slotno;
        this.time = time;
        this.start_time = start_time;
    }
    public slots() {
    }

    
}
