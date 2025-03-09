import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { Service } from "../abstract/Service";
import { PageService } from "../Service/PageService";
import { DB } from "../app";
import { Reservation } from "../interfaces/Reservations"; // 引入接口
require('dotenv').config()

export class ReservationsController extends Contorller {
    protected service: Service;

    constructor() {
        super();
        this.service = new PageService();
    }

    public async test(Request: Request, Response: Response) {
        try {
            // 使用資料庫
            await DB.connection?.query("USE lab_b310;");
    
            const resp = await DB.connection?.query("SELECT reservation_id, student_id, seat_id, timeslot_id, create_time FROM Reservations;");
            Response.send(resp)
    
        } catch (error) {
            // 錯誤處理
            console.error('Database query error:', error);
            Response.status(500).send({ error: 'Database query failed' });
        }
    
    }
}